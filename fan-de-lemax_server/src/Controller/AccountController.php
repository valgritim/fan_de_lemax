<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AccountController extends AbstractController
{
    /**
     * @Route("/api/account", name="account",methods={"GET"})
     * 
     */
    public function index(): Response
    {
        return $this->json([
            'account' => 'AccountController',
        ]);
    }
}
