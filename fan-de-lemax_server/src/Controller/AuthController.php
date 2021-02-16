<?php

namespace App\Controller;

use App\Entity\User;
use \Firebase\JWT\JWT;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
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
    public function login(Request $request, UserRepository $userRepository, SerializerInterface $serializer, ValidatorInterface $validator, UserPasswordEncoderInterface $encoder){
        
        $data = $request->getContent(); 
              
        $user = $serializer->deserialize($data, User::class,'json');
       
        $errors = $validator->validate($user); 
        
        if(count($errors) > 0){
            return $this->json($errors, 400);
        }

        $userInDb = $userRepository->findOneBy(['email' => $user->getEmail()]);

        if($userInDb == null){
            return $this->json($errors, 400);
        }
                
        $isValid = $encoder->isPasswordValid($userInDb, $user->getPassword());
        
        if(!$isValid){
            return $this->json([
                'message' => 'email or password is wrong!',
            ]);
        }

        $payload = [
            "user" => $userInDb->getUserName(),
            "exp" => (new \DateTime())->modify("+5 minutes")->getTimestamp(),
        ];

        // $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');

        return $this->json($userInDb, 200, [], ["user:ok"]);      
       
        
    }

    /**
     * @Route("api/register", name="api_register", methods={"POST"})
     *
     * 
     */
    public function register(Request $request, UserRepository $userRepository, EntityManagerInterface $em,SerializerInterface $serializer, ValidatorInterface $validator, UserPasswordEncoderInterface $encoder){

        $errors = [];

        $jsonRecu = $request->getContent();

        try{

            $user = $serializer->deserialize($jsonRecu, User::class, 'json');
                       
            $errors = $validator->validate($user);            

            if(count($errors) > 0){
                return $this->json([
                    'errors' => $errors
                ], 400);
            }

            $password = $user->getPassword();
            $user->setPassword($encoder->encodePassword($user, $password));
            $user->setRoles(['ROLE_USER']); 

            $em->persist($user);
            $em->flush();
            //201 status=> created on server
            $userInDb = $userRepository->findOneBy($user->getEmail());

            //Serializing db return
            $json = $serializer->serialize($userInDb, 'json', []);
            return $this->json($userInDb, 201, [], ["user:created"]);

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
     * @Route("/profile", name="api_profile")
     * @IsGranted("ROLE_USER")
     * 
     */
    public function getProfile(){

        return $this->json(
            [
                'user' => $this->getUser()
            ]
        );
    }
    /**
     * @Route("/logout", name="api_logout")
     *
     * @return void
     */
    public function logout(){

    }

}
