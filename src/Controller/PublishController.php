<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class PublishController extends AbstractController
{
    #[Route('/api/publish', name: "messages", methods: ['POST'])]
    public function publish(HubInterface $hub): Response
    {
        $update = new Update(
            'https://127.0.0.1:8001/messages',
            json_encode(['data' => 'OutOfStock'])
        );

        $hub->publish($update);

        return new Response('published!');
    }
}
