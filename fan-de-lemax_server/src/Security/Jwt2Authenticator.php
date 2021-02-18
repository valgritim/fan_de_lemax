<?php

namespace App\Security;

use Firebase\JWT\JWT;
use App\Repository\UserRepository;
use Firebase\JWT\ExpiredException;
use Doctrine\ORM\EntityManagerInterface;
use Firebase\JWT\SignatureInvalidException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class Jwt2Authenticator extends AbstractGuardAuthenticator
{
    private $params;
    private $userRepository;

    public function __construct(UserRepository $userRepository, ContainerBagInterface $params, UserPasswordEncoderInterface $encoder)
    {
        $this->userRepository = $userRepository;
        $this->params = $params;
    }

    public function supports(Request $request)
    {
        return $request->headers->has('Authorization');
    }

    public function getCredentials(Request $request)
    {
        return $request->headers->get('Authorization');
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $error = "Unable to validate session.";

        try{
            $credentials = str_replace('Bearer ', '', $credentials);
            
            $jwt = (array) JWT::decode($credentials, $this->params->get('jwt_secret'), ['HS256']);
            
            return $this->userRepository->findOneBy([
                'email' => $jwt['user'],
            ]);

        } catch(ExpiredException $e){
            $error = "Session has expired";
        } catch(SignatureInvalidException $e){
            $error = "Attempting access invalid session";
        } catch(\Exception $e){
            $error = $e->getMessage();
        }

    throw new CustomUserMessageAuthenticationException($error);
    
    }

    public function checkCredentials($credentials, UserInterface $user)    
    {
        return true;
        
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new JsonResponse([
            'message' => $exception->getMessage()
        ], Response::HTTP_UNAUTHORIZED);
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey)
    {
        return ;
    }

    public function start(Request $request, AuthenticationException $authException = null)
    {
        $data = [
            'message' => 'Authentication required'
        ];
        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

    public function supportsRememberMe()
    {
        // todo
    }
}
