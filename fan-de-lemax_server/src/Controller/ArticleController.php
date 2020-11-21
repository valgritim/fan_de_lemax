<?php

namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class ArticleController extends AbstractController
{
    /**
     * Retourne tous les articles de la base de données
     * @Route("/api/articles", name="api_articles", methods={"GET"})
     * @param ArticleRepository $repository
     * @param SerializerInterface $serializerInterface
     * @return JsonResponse
     */
    public function index(ArticleRepository $repository, SerializerInterface $serializerInterface)
    {
        $articles = $repository->findAll();      

        $json = $serializerInterface->serialize($articles,'json', ['groups' => 'article:read']);
        
        
        return new JsonResponse($json, 200,[], true);
        // return $this->json($articles, 200 , [], ['groups' => 'article:read']);       
        
    }

        /**
     * Retourne tous les articles de la base de données
     * @Route("/api/articles/retired", name="api_retired_articles", methods={"GET"})
     * @param ArticleRepository $repository
     * @param SerializerInterface $serializerInterface
     * @return JsonResponse
     */
    public function getRetiredArticles(ArticleRepository $repository, SerializerInterface $serializerInterface, NormalizerInterface $ni)
    {
        $articles = $repository->findRetiredArticles(); 
              
        $json = $serializerInterface->serialize($articles,'json', ['groups' => 'article:read']);
        
        return new JsonResponse($json, 200,[], true);
        // return $this->json($json, 200 , [], ['groups' => 'article:read']);       
        
    }

    /**
     * Retourne un article selon l'id entré
     * @Route("/api/articles/article/{id}", name="api_articles_article", methods={"GET"})
     * @var $id
     * @param ArticleRepository $repository
     * @param SerializerInterface $serializerInterface
     * @return JsonResponse
     */
    public function getArticleById(ArticleRepository $repository,SerializerInterface $serializerInterface, $id){

        $article = $repository->findOneById($id);
        $json = $serializerInterface->serialize($article,'json', ['groups' => 'article:read']);
         
        return new JsonResponse($json, 200,[], true);
        //return $this->json($article, 200,[], ['groups' => 'article:read']);

    }
    /**
     * Retourne un article selon l'id entré
     * @Route("/api/articles/name/{name}", name="api_articles_articleName", methods={"GET"})
     * @var $name
     * @param ArticleRepository $repository
     * @param SerializerInterface $serializerInterface
     * @return JsonResponse
     */
    public function getArticleByName($name, ArticleRepository $repository, SerializerInterface $serializerInterface){

        $article = $repository->findByName($name);
        $json = $serializerInterface->serialize($article,'json', ['groups' => 'article:read']);
         
        return new JsonResponse($json, 200,[], true);

        // return $this->json($article, 200,[], ['groups' => 'article:read']);

    }

        /**
     * Retourne un article selon le sku (identifiant Lemax) entré
     * @Route("/api/articles/sku/{sku}", name="api_articles_articleSku", methods={"GET"})
     * @param $sku
     * @param ArticleRepository $repository
     * @param SerializerInterface $serializerInterface
     * @return JsonResponse
     */
    public function getArticleBySku($sku, ArticleRepository $repository, SerializerInterface $serializerInterface){

        $article = $repository->findBySku($sku);
        $json = $serializerInterface->serialize($article,'json', ['groups' => 'article:read']);
         
        return new JsonResponse($json, 200,[], true);
        // return $this->json($article, 200,[], ['groups' => 'article:read']);

    }

    /**
     * @Route("/api/articles/{categoryId}", name="api_articles_articleCategory", methods={"GET"})
     *
     * @param $categoryId
     * @param ArticleRepository $repository
     * @param SerializerInterface $serializerInterface
     * @return JsonResponse
     */
    public function getArticlesByCategory($categoryId, ArticleRepository $repository, SerializerInterface $serializerInterface){

        $articles = $repository->findArticlesByCategoryId($categoryId);
        $json = $serializerInterface->serialize($articles, 'json', ['groups' => 'article:read']);

        return new JsonResponse($json, 200, [], true);
    }
}

