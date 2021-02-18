<?php

namespace App\Security;

use \Firebase\JWT\JWT;
use \Firebase\JWT\ExpiredException;
use \Firebase\JWT\SignatureInvalidException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class JwtAuthenticator extends AbstractGuardAuthenticator
{
    /**
     * When this auth is called, it firstly checks if a jwt cookie is set (as authenticator), if true goes to getCredentials
     *
     * @param Request $request
     * @return void
     */
    public function supports(Request $request)
    {
        dd($request->cookies);
        return $request->cookies->get("token") ? true: false;
    }

    /**
     * Gets the credentials from the cookie jwt and decode JWT.Credentials is an array
     * Checks if the cookie is not expired and if the signature(secret encoded key) is valid
     *
     * @param Request $request
     * @return void
     */
    public function getCredentials(Request $request)
    {
        $cookie = $request->cookies->get("token");
        dd($cookie);
        
        $error = "Unable to validate session.";

        try
        {
            $decodeJwt = JWT::decode($cookie, getenv("JWT_SECRET"), ['HS256']);

            return [
                'email' => $decodeJwt->username
            ];
            

        } catch(ExpiredException $e){
            $error = "Session has expired";
        } catch(SignatureInvalidException $e){
            $error = "Attempting access invalid session";
        } catch(\Exception $e){
            $error = $e->getMessage();
        }

        throw new CustomUserMessageAuthenticationException($error);
    }

    /**
     * Gets the user with the credentials decoded in the jwt
     *
     * @param [type] $credentials
     * @param UserProviderInterface $userProvider
     * @return void
     */
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        return $userProvider->loadUserByUsername($credentials['email']);
    }

    /**
     * Verify if the credentials and the username are the same and return true
     *
     * @param [type] $credentials
     * @param UserInterface $user
     * @return void
     */
    public function checkCredentials($credentials, UserInterface $user)
    {
        return $user->getUsername() === $credentials['email'];
    }

    /**
     * Return a error message in case authentication failed
     *
     * @param Request $request
     * @param AuthenticationException $exception
     * @return void
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new JsonResponse([
            'error' => $exception->getMessageKey()
        ], Response::HTTP_UNAUTHORIZED);
    }

    /**
     * Let the request continue as normal, so keep it empty
     *
     * @param Request $request
     * @param TokenInterface $token
     * @param string $providerKey
     * @return void
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey)
    {
        // todo
    }

    /**
     * the two below methods are used in the LoginAuthenticator
     *
     * @param Request $request
     * @param AuthenticationException $authException
     * @return void
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        //TOdo
    }

    public function supportsRememberMe()
    {
        // todo
    }
}
