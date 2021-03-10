<?php
namespace App\Service;

use Goutte\Client;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Validator\Constraints\Length;

class CrawlingService {
    /**
     * Get the datas from Lemax main websites by sku(lemax ref) and send price and link
     *
     */
    public function getPricesFromShops($sku){

        $client = new Client();
        
        if(strlen($sku)< 5){
            $sku = "0".$sku;
        }
        $crawler1 = $client->request('GET','https://www.felinaworld.com/fr/catalogsearch/result/?q='.$sku);         
        $crawler2 = $client->request('GET','https://www.wishpel-village.fr/catalogsearch/result/?q='.$sku);
        $crawler3 = $client->request('GET','https://www.desjardins.fr/recherche?controller=search&s='.$sku);

        //Search result for Felinaworld------------------------------
       
        $result1 = $crawler1->filter('span.price')->text('');
        if($result1 === ""){
            $lien1 = $crawler1->filter('a.product-item-link')->html('<a class="product-item-link" href=""></a>');
        } else {
            $lien1 = $crawler1->filter('a.product-item-link')->attr('href');
        }
        

        //Search result for Wishpel-Village--------------------------
        
        $result2 = $crawler2->filter('p.special-price > span')->text('');
        if($result2 === ""){
            $lien2 = $crawler1->filter('p.product-name')->html('');
        } else {
            $lien2 = $crawler2->filter('p.product-name > a ')->attr('href');
            
        }
        
      
        //Search result for Desjardins--------------------------------

        $result3 = $crawler3->filter('span.price')->text('');
        if($result3 === ""){
            $lien3 = $crawler3->filter("a.thumbnail")->html('');
        } else {
            $lien3 = $crawler3->filter("a.thumbnail")->attr('href');
                        
        }
                

            return [
                [ "name" => "felinaworld",
                    "price" => $result1,
                    "link" => $lien1
                ],
                [ "name" => "wishpel village",
                    "price" => $result2,
                    "link" => $lien2
                    
                ],
                [   "name" => "desjardins",
                    "price" => $result3,
                    "link" => $lien3
                    
                ]
            ];
    }

    /**
     * Get all the datas from Lemax main Website - use once to fill DB
     *
     */
    public function getAllDatasFromLemaxCollection($category, $numberOfPages){

        $client = new Client();        

        for($i = 1; $i <= $numberOfPages; $i++){
            
            $generalCrawler = $client->request('GET','https://www.lemaxcollection.com/villages/caddington/'. $category);
            
            $nodeValues = $generalCrawler->filter('li.sfproductListItem')->each(function (Crawler $node) use ($client, $category)
            {
                $img = $node->filter('img.productImage')->attr('src');                
                $sku =$node->filter('h2.sfproductTitle > a')->text();                
                $name = $node->filter('img.productImage')->attr('title');
                $link = $node->filter('h2.sfproductTitle > a')->attr('href');
            //    dd($link);
                $linkLength = strlen($link); 
                $correctedLink = substr($link,13, $linkLength+1);
                // dd($correctedLink);
            //Search by item to find release date
                $itemCrawler = $client->request('GET','https://www.lemaxcollection.com/categories/'. $category . '/' . $correctedLink);                     
                $releaseSearch = $itemCrawler->filter('span#ctl00_productlistWidget_C002_productsFrontendDetail_ctl00_ctl00_SingleItemContainer_ctrl0_customFieldsControl_lblYearReleased')->text();
                
                $data = array(); 
                $data[] = [$name, $sku, $releaseSearch, $img, $category];  

               return $data;
                   
            }); 
           
        }
        return $nodeValues;
    }

    /**
     * Get all the retired lemax collection from Lemax main Website - use once to fill DB
     *
     */
    public function getAllRetiredDatasFromLemaxCollection($category, $numberOfPages){

        $client = new Client();        

        for($i = 1; $i <= $numberOfPages; $i++){
            
            $generalCrawler = $client->request('GET','https://www.lemaxcollection.com/retired/holidays-seasons/'. $category ."/page/" . $numberOfPages);
            
            $nodeValues = $generalCrawler->filter('li.sfproductListItem')->each(function (Crawler $node) use ($client, $category)
            {
                $img = $node->filter('img.productImage')->attr('src');                
                $sku =$node->filter('h2.sfproductTitle > a')->text();                
                $name = $node->filter('img.productImage')->attr('title');
                $link = $node->filter('h2.sfproductTitle > a')->attr('href');
                $linkLength = strlen($link); 
                $correctedLink = substr($link,3, $linkLength+1);
            //Search by item to find release date
                $itemCrawler = $client->request('GET','https://www.lemaxcollection.com/retired/holidays-seasons/'. $category . '/' . $correctedLink);                
                $releaseSearch = $itemCrawler->filter('div.productSku')->nextAll()->eq(0)->text();                
                $retiredSearch = $itemCrawler->filter('div.productSku')->nextAll()->eq(1)->text();
                $lengthRelease = strlen($releaseSearch);
                $correctedRelease= substr($releaseSearch, 15, $lengthRelease+1);
                $lengthRetired = strlen($retiredSearch);
                $correctedRetired = substr($retiredSearch, 14, $lengthRetired+1);
                
                $data = array(); 
                $data[] = [$name, $sku, $correctedRelease, $correctedRetired, $img, $category]; 
             //   dd($data); 

               return $data;
                       
            }); 
           
        }
        return $nodeValues;
    }
}