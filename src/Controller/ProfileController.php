<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\NewsPost;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

#[Route('/api/profile')]
class ProfileController extends AbstractController
{
    #[Route('/', name: 'app_profile', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine, UserRepository $userRepo): Response
    {
        $user = $this->getUser()->getUserIdentifier();
        $userRepo =  $doctrine->getRepository(User::class)->findOneBy(['email' => $user]);
        $email = $userRepo->getEmail();
        $pseudo = $userRepo->getPseudo();
        $finalArray = [];
        $profile = [
            'email' => $email,
            'pseudo' => $pseudo,
        ];
        $posts =  $doctrine->getRepository(NewsPost::class)->findBy(['Pseudo' => $pseudo]);
        $postsArray = [];
        foreach ($posts as $post) {
            $newArray = array(
                'id' => $post->getId(),
                'pseudo' => $post->getPseudo(),
                'picture' => $post->getPicture(),
                'topic' => $post->getTopic(),
                'content' => $post->getContent(),
                'pictureSize' => $post->getPictureSize(),
                'likes' => $post->getLikes(),
            );
            array_push($postsArray, $newArray);
        }
        array_push($finalArray, $profile, $postsArray);
        if (!empty($finalArray)) {
            return new Response(json_encode($finalArray), 200, ['Content-Type' => 'application/json']);
        } else {
            return new Response('user is not authenticated', 400, ['Content-Type' => 'application/json']);
        }
    }
}
