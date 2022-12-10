<?php

namespace App\Controller;

use Gedmo\Sluggable\Util\Urlizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class UploadFilesController extends AbstractController
{
    #[Route('/upload/profilePic', name: 'app_upload_files', methods: ['GET', 'POST'])]
    public function index(ManagerRegistry $doctrine, Request $request): Response
    {
        /** @var UploadedFile $uploadedFile */
        $uploadedFile = $request->files->get('imageFile');
        $destination = $this->getParameter('kernel.project_dir') . '/public/uploads';
        $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $uploadedFile->move(
            $destination,
            $originalFilename
        );
        $file = new UploadedFile($destination, $originalFilename);
        dd($file);
        $user = $this->getUser()->getUserIdentifier();
        $userRepo =  $doctrine->getRepository(User::class)->findOneBy(['email' => $user]);

        return new Response('Ok', 200, ['Content-Type' => 'multipart/form-data']);
    }
}
