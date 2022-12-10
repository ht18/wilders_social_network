<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\Session;

class LogoutController extends AbstractController
{
    #[Route('/logout', name: 'app_logout',  methods: ['GET'])]
    public function logout(Session $session): void
    {
        $session->invalidate();
    }
}
