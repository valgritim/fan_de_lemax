<?php

namespace App\Controller;

use App\Entity\User;
use Firebase\JWT\JWT;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class AuthController extends AbstractController
{
    /**
     * @Route("/", name="api_home")
     *
     * @return void
     */
    public function home(){
        return $this->json(['result' => true]);
    }

    /**
     * @Route("api/user", name="api_user", methods={"GET"})
     */
    public function index(UserRepository $userRepository)
    {
        $users = $userRepository->findAll();

        return $this->json($users, 200, []);

    }

    /**
     * @Route("/api/login", name="api_login", methods={"POST"})
     */
    public function login(Request $request, UserRepository $userRepository, SerializerInterface $serializer, UserPasswordEncoderInterface $encoder){
        
        $data = $request->getContent();
               
        $user = $serializer->deserialize($data, User::class,'json');
    
        $userInDb = $userRepository->findOneBy(['email' => $user->getEmail()]);
        
        if(!$userInDb){

            return new JsonResponse(['message' => 'User unknown'], Response::HTTP_NOT_FOUND);
        }
                
        $isValid = $encoder->isPasswordValid($userInDb, $user->getPassword());
        
        if(!$isValid){
            return $this->json([
                'message' => 'email or password is wrong!',
            ]);
         
        }
        $expiration = time() + 3600;

        $payload = [
            "id" => $userInDb->getId(),
            "user" => $userInDb->getUsername(),
            "exp" => $expiration
        ];

        $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');        
        
        return $this->json([
            'message' => 'success',
            'token' => sprintf('Bearer %s', $jwt)
        ]); 
      
               
    }

    /**
     * @Route("api/register", name="api_register", methods={"POST"})
     *
     * 
     */
    public function register(Request $request, UserRepository $userRepository, EntityManagerInterface $em,SerializerInterface $serializer, UserPasswordEncoderInterface $encoder){

        $errors = [];

        $jsonRecu = $request->getContent();
        

        try{

            $user = $serializer->deserialize($jsonRecu, User::class, 'json');
                       
            $password = $user->getPassword();
            $user->setPassword($encoder->encodePassword($user, $password));
            $user->setRoles(['ROLE_USER']); 

            $em->persist($user);
            $em->flush();
            //201 status=> created on server
            $userInDb = $userRepository->findOneBy(array('email' => $user->getEmail()));

            //Serializing db return
            $json = $serializer->serialize($userInDb, 'json', []);
            return $this->json($$json, 201, [], ["user:created"]);

        } 
        
        catch(UniqueConstraintViolationException $e){
            $errors[] = "The email provided already exists!";
        }

        catch(NotEncodableValueException $e){
            return $this->json([
                'status' => 400,
                'message' => $e
            ]);
        }  
    }

    /**
     * @Route("api/profile", name="profile", methods={"GET"}) 
     * @IsGranted("ROLE_USER")
     */
    public function getProfile(){

        return $this->json(
            [
                'user' => $this->getUser()
            ]
        );
    }

    /**
     * @Route("/logout", name="api_logout", methods={"GET"})
     *
     * @return void
     */
    public function logout(){        

    }



}
