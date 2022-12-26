<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ChannelRepository;
use App\Entity\Channel;
use App\Repository\MessageRepository;

class ChannelController extends AbstractController
{
    #[Route('/api/channels', name: 'app_channel', methods: ['GET'])]
    public function getChannels(ChannelRepository $channelRepository): Response
    {
        $postsArray = [];
        $channels = $channelRepository->findAll();
        foreach ($channels as $channel) {
            $newArray = [
                'id' => $channel->getId(),
                'name' => $channel->getName(),
            ];
            array_push($postsArray, $newArray);
        }
        return new Response(json_encode($postsArray), 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/api/chat/{id}', name: 'app_chat', methods: ['GET'])]
    public function chat(
        Channel $channel,
        MessageRepository $messageRepository
    ): Response {

        $postsArray = [];
        $messages = $messageRepository->findBy([
            'channel' => $channel
        ], ['createdAt' => 'ASC']);
        if ($messages) {
            foreach ($messages as $message) {
                $newArray = [
                    'id' => $message->getId(),
                    'content' => $message->getContent(),
                    'author' => $message->getAuthor()->getPseudo(),
                ];
                array_push($postsArray, $newArray);
            }
            return new Response(json_encode($postsArray), 200, ['Content-Type' => 'application/json']);
        }
        return new Response(json_encode('No messages'), 404, ['Content-Type' => 'application/json']);
    }
}
