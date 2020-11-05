<?php
namespace App\Controller;


use App\Service\CrawlingService;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CrawlingController extends AbstractController{

    /**
     * @Route("/api/crawling/{sku}", name="api_crawling", methods={"GET"})
     */
    public function crawlingDatas($sku, CrawlingService $crawlingService){

        $result = $crawlingService->getDatas($sku);        
        
        return $this->json($result, 200, []);
        

    }

    /**
     * @Route("/api/generalcrawling/{category}/{numberOfPages}", name="api_general_crawler", methods={"GET"})
     */
    public function generalCrawler($category, $numberOfPages,CrawlingService $crawlingService){

        $result = $crawlingService->getAllDatasFromLemaxCollection($category, $numberOfPages);

        //RESTE A FAIRE:
        //1.Après avoir récupéré le tableau, créer un objet Article pour chaque Data
        //2.Persist et Flush dans la DB
        
    }

}