<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\UserRepository;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    /**
     * @Route("/api/users", name="api_users", methods={"GET"})
     */
    public function fetchAllUsers(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }

    /**
     * @Route("/api/user/{userId}/{categoryId}", name="api_user_articles_category", methods={"GET"})
     *
     * @param int $userId
     * @param int $category
     * @return void
     */
    public function fetchArticlesByUserAndByCategory($userId, $categoryId,UserRepository $userRepository, SerializerInterface $serializerInterface){
        // $articles = $userRepository->findArticlesByUserIdAndCategoryId($userId, $category);
        // dd($articles);
        $userToFetch = $userRepository->findOneById($userId);
        $arrayOfArticles = [];
        // dd($userToFetch);
        $userArticles= $userToFetch->getArticles();
        foreach($userArticles as $article){
            if($article->getCategoryId() == $categoryId){
                    array_push($arrayOfArticles,$article);
            }           
        }
    //    dd($arrayOfArticles);
        $json = $serializerInterface->serialize($arrayOfArticles, 'json', ['groups' => 'article:read']);
        return new JsonResponse($json, 200, [], true);
    }

    /**
     * @Route("/api/user/{userId}", name="api_user_articles", methods={"GET"})
     */
    public function fetchArticlesByUser($userId, UserRepository $userRepository, SerializerInterface $serializerInterface){

        $userToFetch = $userRepository->findOneById($userId);
        $userArticles= $userToFetch->getArticles();
        $json = $serializerInterface->serialize($userArticles, 'json', ['groups' => 'article:read']);
        
        return new JsonResponse($json, 200, [], true);
    }

    /**
     * @Route("/api/user/{userId}", name="api_add_article", methods={"PUT"})
     *
     * @param Integer $userId
     * @param Article $article
     * @param UserRepository $userRepository
     * @return void
     */
    public function addArticleByUser($userId, Request $request, EntityManagerInterface $em, ArticleRepository $articleRepository, UserRepository $userRepository){

        $userInDb = $userRepository->findOneById($userId);
        // dd($userInDb);
        if(!$userInDb){
            return new JsonResponse(['message' => 'Unknown user'], Response::HTTP_NOT_FOUND, [], true);
        }
        $data = $request->getContent();
        
        $json = json_decode($data);        
        $article = $articleRepository->findOneById($json->id);
        
        $userInDb->addArticle($article);
        $em->persist($userInDb);
        $em->flush();


        return new JsonResponse('Article inserted in User Portfolio', 200, []);
    }
}
