<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CategoryController extends AbstractController{

    /**
     * @Route("/api/category/{name}" , name="api_category", methods={"GET"})
     *
     * @param String $value
     * 
     */
    public function findByOneCategoryName($name, CategoryRepository $categoryRepository){

        $category = $categoryRepository->findByCategoryName($name);
      
        return $this->json($category, 200, [], ['groups' => "category:read"]);
        

    }
}