<?php

namespace App\Controller;

use App\Entity\NewsPost;
use App\Entity\User;
use App\Repository\NewsPostRepository;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/news')]
class NewsPostController extends AbstractController
{
    #[Route('/', name: 'news', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $posts =  $doctrine->getRepository(NewsPost::class)->findAll();
        $entityManager->flush();
        $postsArray = [];
        foreach ($posts as $post) {
            $newArray = [
                'nbr' => count($posts),
                'id' => $post->getId(),
                'pseudo' => $post->getPseudo(),
                'picture' => $post->getPicture(),
                'topic' => $post->getTopic(),
                'content' => $post->getContent(),
                'content_img' => $post->getContentImg(),
                'likes' => $post->getLikes(),
            ];
            array_push($postsArray, $newArray);
        }
        return new Response(json_encode($postsArray), 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/new', name: 'news_id', methods: ['GET', 'POST'])]
    public function new(Request $request, ManagerRegistry $doctrine, UserRepository $userRepo, NewsPostRepository $newsPostRepository): Response
    {
        $newsPost = new NewsPost();
        $form = json_decode($request->getContent(), true);
        $user = $this->getUser()->getUserIdentifier();
        $userRepo =  $doctrine->getRepository(User::class)->findOneBy(['email' => $user]);
        $pseudo = $userRepo->getPseudo();
        $newsPost->setPseudo($pseudo);
        $newsPost->setPicture('');
        $newsPost->setTopic($form['topic']);
        $newsPost->setContent($form['content']);
        $newsPost->setContentImg('test');
        $newsPost->setLikes(0);
        if ($form) {
            $newsPostRepository->save($newsPost, true);
            return new Response('Ok', 200, ['Content-Type' => 'application/json']);
        } else {
            return new Response('not ok', 400, ['Content-Type' => 'application/json']);
        }
    }

    #[Route('/{id}', name: 'app_news_post_show', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine, $id): Response
    {
        $post =  $doctrine->getRepository(NewsPost::class)->find($id);
        if ($post) {
            $postsArray = [
                'id' => $post->getId(),
                'pseudo' => $post->getPseudo(),
                'picture' => $post->getPicture(),
                'topic' => $post->getTopic(),
                'content' => $post->getContent(),
                'content_img' => $post->getContentImg(),
                'likes' => $post->getLikes(),
            ];
            return new Response(json_encode($postsArray), 200, ['Content-Type' => 'application/json']);
        }
        return new Response('bad request', 400, ['Content-Type' => 'application/json']);
    }

    #[Route('/{id}/edit', name: 'app_news_post_edit', methods: ['GET', 'POST'])]
    public function edit(ManagerRegistry $doctrine, $id, NewsPostRepository $newsPostRepository, Request $request): Response
    {
        $entityManager = $doctrine->getManager();
        $post =  $doctrine->getRepository(NewsPost::class)->find($id);
        $topic = $post->getTopic();
        $content = $post->getContent();
        $likes = $post->getLikes();
        $entityManager->flush();
        $user = $this->getUser()->getUserIdentifier();
        $userRepo =  $doctrine->getRepository(User::class)->findOneBy(['email' => $user]);
        $pseudo = $userRepo->getPseudo();
        if ($post && $pseudo === $post->getPseudo()) {
            $form = json_decode($request->getContent(), true);
            if ($form) {
                $post->setPicture('');
                if ($form['topic']) {
                    $post->setTopic($form['topic']);
                } else {
                    $post->setTopic($topic);
                }
                if ($form['content']) {
                    $post->setContent($form['content']);
                } else {
                    $post->setContent($content);
                }
                if ($form['likes']) {
                    $post->setLikes($form['likes']);
                } else {
                    $post->setLikes($likes);
                    $post->setContentImg('test');
                }

                $newsPostRepository->save($post, true);
                return new Response('Ok', 200, ['Content-Type' => 'application/json']);
            } else {
                return new Response('not ok', 400, ['Content-Type' => 'application/json']);
            }
        }
        return new Response('bad request', 400, ['Content-Type' => 'application/json']);
    }

    #[Route('/{id}/delete', name: 'app_news_post_delete', methods: ['POST'])]
    public function delete(ManagerRegistry $doctrine, $id, NewsPostRepository $newsPostRepository): Response
    {
        $post =  $doctrine->getRepository(NewsPost::class)->find($id);
        $user = $this->getUser()->getUserIdentifier();
        $userRepo =  $doctrine->getRepository(User::class)->findOneBy(['email' => $user]);
        $pseudo = $userRepo->getPseudo();
        if ($post->getPseudo() === $pseudo) {
            $newsPostRepository->remove($post, true);
            return new Response('post deleted', 200, ['Content-Type' => 'application/json']);
        } else {
            return new Response('cannot delete this post because it is not yours', 400, ['Content-Type' => 'application/json']);
        }
    }
}
