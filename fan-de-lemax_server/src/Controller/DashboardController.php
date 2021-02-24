<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DashboardController extends AbstractController
{
    /**
     * @Route("/api/dashboard", name="api_dashboard",methods={"GET"})
     * 
     */
    public function index(): Response
    {
        return $this->json([
            'dashboard' => 'DashboardController',
        ]);
    }
}
