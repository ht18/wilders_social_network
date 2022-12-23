<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    #[Route('/api/users', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = new User();
        $form = json_decode($request->getContent(), true);
        $errors = [];
        $pseudo = $form['pseudo'];
        $email = $form['email'];
        $password = $form['plainPassword'];
        $updatedAt = $form['updatedAt'];
        $imageName = $form['imageName'];
        $imageSize = $form['imageSize'];

        if (strlen($pseudo) < 3 || strlen($pseudo) > 100) {
            array_push($errors, 'Pseudo should be between 2 and 100');
        }

        if (strlen($password) < 7 || strlen($pseudo) > 100) {
            array_push($errors, 'Password should be between 6 and 100');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            array_push($errors, 'This is not an email');
        }

        if (!$errors) {
            $user->setPseudo($pseudo);
            $user->setEmail($email);
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $password
                )
            );
            $user->setImageName($imageName);
            $user->setImageSize($imageSize);
            $user->setUpdatedAt($updatedAt);
            $userRepository->save($user, true);
            $entityManager->persist($user);
            $entityManager->flush();
            return new JsonResponse(['id' => 0, 'data' => 'Your account has been created', 'errors' => false]);
        }
        return new JsonResponse(['id' => 1, 'data' => $errors, 'errors' => true]);
    }
}
