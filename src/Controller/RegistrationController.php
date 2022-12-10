<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Security\AppAuthentificatorAuthenticator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegistrationController extends AbstractController
{
    #[Route('/api/users', name: 'app_register', methods: ['POST'])]
    public function register(ValidatorInterface $validator, Request $request, UserRepository $userRepository, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $form = json_decode($request->getContent(), true);
        $errors = $validator->validate($form);
        if (!count($errors)) {
            $user->setPseudo($form['pseudo']);
            $user->setEmail($form['email']);
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $form['plainPassword']
                )
            );
            $userRepository->save($user, true);
            $entityManager->persist($user);
            $entityManager->flush();
            return new Response('Ok', 200, ['Content-Type' => 'application/json']);
        }

        return new Response('not ok', 400, ['Content-Type' => 'application/json']);
    }
}
