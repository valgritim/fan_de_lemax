<?php
namespace App\Controller;


use App\Entity\Article;
use App\Entity\Category;
use App\Service\CrawlingService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CrawlingController extends AbstractController{

    /**
     * @Route("/api/crawling/{sku}", name="api_crawling", methods={"GET"})
     */
    public function crawlingPrices($sku, CrawlingService $crawlingService){

        $result = $crawlingService->getPricesFromShops($sku);        
        
        return $this->json($result, 200, []);
        

    }

    /**
     * @Route("/api/generalscraping/{category}/{numberOfPages}", name="api_general_crawler", methods={"GET"})
     */
    public function generalCrawler($category, $numberOfPages,CrawlingService $crawlingService, EntityManagerInterface $em){

        $results = $crawlingService->getAllDatasFromLemaxCollection($category, $numberOfPages);
                
        for($i = 0 ; $i < count($results); $i++){
            // dd($results[$i][0][0]);
            $article = "";
            $articleId = $article.$i;
            $articleId = new Article();
            $articleId->setName($results[$i][0][0]);
            $articleId->setSku($results[$i][0][1]);
            $articleId->setReleased($results[$i][0][2]);
            $articleId->setImagePath($results[$i][0][3]);

            $categoryName = $results[$i][0][4];
          
            switch($categoryName){
                case "lighted-buildings" : $articleId->setCategoryId(1);
                break;                          
                case "facades": $articleId->setCategoryId(2);
                break;                
                case "figurines": $articleId->setCategoryId(3);
                break;   
                case "table-pieces": $articleId->setCategoryId(4);
                break;                    
                case "landscaping": $articleId->setCategoryId(5);  
                break;                   
                case "accessories":  $articleId->setCategoryId(6);  
                break;                  
                case "sights-and-sounds": $articleId->setCategoryId(7);
                break;                  
                default : $articleId->setCategoryId(4);
            } 
            // dd($articleId);
            $em->persist($articleId);            
        }

        $em->flush();
        
        return $this->json($results,200);
         
    }

        /**
     * @Route("/api/generalcrawling/retired/{category}/{numberOfPages}", name="api_general_retired_crawler", methods={"GET"})
     */
    public function generalRetiredCrawler($category, $numberOfPages,CrawlingService $crawlingService, EntityManagerInterface $em){

        $results = $crawlingService->getAllRetiredDatasFromLemaxCollection($category, $numberOfPages);
        // dd($results);
                
        for($i = 0 ; $i < count($results); $i++){
            // dd($results[$i][0][0]);
            $article = "";
            $articleId = $article.$i;
            $articleId = new Article();
            $articleId->setName($results[$i][0][0]);
            $articleId->setSku(intval($results[$i][0][1]));
            $articleId->setReleased($results[$i][0][2]);
            $articleId->setRetired($results[$i][0][3]);
            $articleId->setImagePath($results[$i][0][4]);

            $categoryName = $results[$i][0][5];
          
            switch($categoryName){
                case "lighted-buildings" : $articleId->setCategoryId(1);
                break;                          
                case "facades": $articleId->setCategoryId(2);
                break;                
                case "figurines": $articleId->setCategoryId(3);
                break;   
                case "table-pieces": $articleId->setCategoryId(4);
                break;                    
                case "landscaping": $articleId->setCategoryId(5);  
                break;                   
                case "accessories":  $articleId->setCategoryId(6);  
                break;                  
                case "sights-and-sounds": $articleId->setCategoryId(7);
                break;                  
                default : $articleId->setCategoryId(4);
            } 
            // dd($articleId);
            $em->persist($articleId);            
        }

        $em->flush();
        
        return $this->json($results,200);
         
    }

}