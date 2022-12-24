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
use Symfony\Component\HttpFoundation\JsonResponse;
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
                'picture_size' => $post->getPictureSize(),
                'likes' => $post->getLikes(),
            ];
            array_push($postsArray, $newArray);
        }
        return new Response(json_encode($postsArray), 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/new', name: 'news_id', methods: ['GET', 'POST'])]
    public function new(Request $request, ManagerRegistry $doctrine, UserRepository $userRepo, NewsPostRepository $newsPostRepository): JsonResponse
    {
        $newsPost = new NewsPost();
        $errors = [];
        $form = json_decode($request->getContent(), true);

        $user = $this->getUser()->getUserIdentifier();
        $userRepo =  $doctrine->getRepository(User::class)->findOneBy(['email' => $user]);
        $pseudo = $userRepo->getPseudo();
        $topic = $form['topic'];
        $content = $form['content'];
        $pictureSize = $form['pictureSize'];
        $picture = $form['picture'];

        if (strlen($topic) < 2 || strlen($topic) > 255) {
            array_push($errors, [0 => 'Please insert a topic']);
        }

        if (strlen($content) < 2) {
            array_push($errors, [1 => 'You cannot publish an empty content']);
        }

        if (!$errors) {
            $newsPost->setPseudo($pseudo);
            $newsPost->setTopic($topic);
            $newsPost->setContent($content);
            $newsPost->setLikes(0);
            if ($picture === "undefined" || $pictureSize === "undefined") {
                $newsPost->setPictureSize($pictureSize);
                $newsPost->setPicture($picture);
            } else {
                $newsPost->setPictureSize($pictureSize);
                $newsPost->setPicture($picture);
            }
            $newsPostRepository->save($newsPost, true);
            return new JsonResponse(['id' => 0, 'data' => 'Your post has been created', 'errors' => false]);
        } else {
            return new JsonResponse(['id' => 1, 'data' => $errors, 'errors' => true]);
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
                'pictureSize' => $post->getPictureSize(),
                'topic' => $post->getTopic(),
                'content' => $post->getContent(),
                'likes' => $post->getLikes(),
            ];
            return new Response(json_encode($postsArray), 200, ['Content-Type' => 'application/json']);
        }
        return new Response('bad request', 400, ['Content-Type' => 'application/json']);
    }

    #[Route('/{id}/edit', name: 'app_news_post_edit', methods: ['GET', 'POST'])]
    public function edit(ManagerRegistry $doctrine, $id, NewsPostRepository $newsPostRepository, Request $request): JsonResponse
    {
        $errors = [];
        $entityManager = $doctrine->getManager();
        $post =  $doctrine->getRepository(NewsPost::class)->find($id);
        $topic = $post->getTopic();
        $content = $post->getContent();
        $likes = $post->getLikes();
        $entityManager->flush();
        $user = $this->getUser()->getUserIdentifier();
        $userRepo =  $doctrine->getRepository(User::class)->findOneBy(['email' => $user]);
        $pseudo = $userRepo->getPseudo();

        $form = json_decode($request->getContent(), true);
        $topicForm = $form['topic'];
        $contentForm = $form['content'];
        $likesForm = $form['likes'];

        if (strlen($topicForm) < 2 || strlen($topicForm) > 255) {
            array_push($errors, [0 => 'Please insert a topic']);
        }

        if (strlen($contentForm) < 2) {
            array_push($errors, [1 => 'You cannot publish an empty content']);
        }

        if ($post && $pseudo === $post->getPseudo() && !$errors) {
            if ($topicForm) {
                $post->setTopic($topicForm);
            } else {
                $post->setTopic($topic);
            }
            if ($contentForm) {
                $post->setContent($contentForm);
            } else {
                $post->setContent($content);
            }
            if ($likesForm) {
                $post->setLikes($likesForm);
            } else {
                $post->setLikes($likes);
            }
            $newsPostRepository->save($post, true);
            return new JsonResponse(['id' => 0, 'data' => 'Your post has been updated', 'errors' => false]);
        } else {
            return new JsonResponse(['id' => 1, 'data' => $errors, 'errors' => true]);
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
