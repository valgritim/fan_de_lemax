<?php

namespace App\Controller;

use Exception;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

class UserController extends AbstractController
{
    /**
     * @Route("api/user", name="api_user", methods={"GET"})
     */
    public function index(UserRepository $userRepository)
    {
        $users = $userRepository->findAll();

        return $this->json($users, 200, []);

    }

    /**
     * @Route("api/user/login", name="api_user_login", methods={"POST"})
     */
    public function login(Request $request, UserRepository $userRepository,SerializerInterface $serializer, ValidatorInterface $validator){

        $jsonRecu = $request->getContent();        
        
        $user = $serializer->deserialize($jsonRecu, User::class,'json');

        //First check, if fields are not correctly filled
        $errors = $validator->validate($user);

        if(count($errors) > 0){
                return $this->json($errors, 400);
        }
        //Get username and password to compare with data in DB
        $username = $user->getUsername();            
        $userpassword = $user->getPassword();                  

        try{
            $userInDb = $userRepository->findOneByUsername($username);
            if(!$userInDb) {
                return $this->json([
                    "status" => 400,
                    "message" => "Erreur dans le username ou le mot de passe"
                ]);
            }
            
            $userInDbPwd = $userInDb->getPassword();
            
            if(password_verify($userpassword,$userInDbPwd)){
                
                return $this->json( $user, 200, [], ["user:read"]);
            }

        } catch(Exception $e){

            return $this->json([
                "status" => 400,
                "message" => "Erreur dans le username ou le mot de passe"
            ]);
         }
       
        
    }

    /**
     * @Route("api/user/register", name="api_user_register", methods={"POST"})
     *
     * 
     */
    public function register(Request $request, EntityManagerInterface $em,SerializerInterface $serializer, ValidatorInterface $validator){

        $jsonRecu = $request->getContent();

        try{

            $user = $serializer->deserialize($jsonRecu, User::class, 'json');            
            $errors = $validator->validate($user);

            if(count($errors) > 0){
                return $this->json($errors, 400);
            }

            $userPasswordHash = password_hash($user->getPassword(), PASSWORD_BCRYPT);
            $newUser = $user->setPassword($userPasswordHash);

            $em->persist($user);
            $em->flush();
            //201 status=> created on server
            return $this->json($user, 201, [], ["user:read"]);

        } catch(NotEncodableValueException $e){
            return $this->json([
                'status' => 400,
                'message' => $e
            ]);
        }
        

    }
}
