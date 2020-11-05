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
     */
    public function index(ArticleRepository $repository, NormalizerInterface $normalizerInterface, SerializerInterface $serializerInterface)
    {
        $articles = $repository->findAll();      

        // $json = $serializerInterface->serialize($articles,'json', ['groups' => 'article:read']);
         
        // return new JsonResponse($json, 200,[], true);
        return $this->json($articles, 200 , [], ['groups' => 'article:read']);       
        
    }

    /**
     * Retourne un article selon l'id entré
     * @Route("/api/articles/{id}", name="api_articles_article", methods={"GET"})
     */
    public function getArticleById(ArticleRepository $repository, $id){

        $article = $repository->findOneById($id);

        return $this->json($article, 200,[], ['groups' => 'article:read']);

    }
    /**
     * Retourne un article selon l'id entré
     * @Route("/api/articles/name/{name}", name="api_articles_articleName", methods={"GET"})
     */
    public function getArticleByName($name, ArticleRepository $repository){

        $article = $repository->findByName($name);

        return $this->json($article, 200,[], ['groups' => 'article:read']);

    }

        /**
     * Retourne un article selon l'id entré
     * @Route("/api/articles/sku/{sku}", name="api_articles_articleSku", methods={"GET"})
     */
    public function getArticleBySku($sku, ArticleRepository $repository){

        $article = $repository->findBySku($sku);

        return $this->json($article, 200,[], ['groups' => 'article:read']);

    }
}

