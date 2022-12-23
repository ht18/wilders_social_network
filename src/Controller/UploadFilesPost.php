<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class UploadFilesPost extends AbstractController
{
    #[Route('/api/uploads/posts_picture', name: 'app_posts_upload_files', methods: ['POST'])]
    public function index(): JsonResponse
    {
        header('Access-Control-Allow-Origin: *');

        if (isset($_FILES['file'])) {
            $file_name = $_FILES['file']['name'];
            $file_size = $_FILES['file']['size'];
            $route = $this->getParameter('APP_ROUTE');
            $uniqid = pathinfo($file_name, PATHINFO_FILENAME) . uniqid();
            $extension = pathinfo($file_name, PATHINFO_EXTENSION);
            $new_file_name = $route . "src/uploads/posts_picture/" . basename($uniqid) . '.' . $extension;
            $tmp_file_name = $_FILES['file']['tmp_name'];
            $authorizedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            $maxFileSize = 1000000;
            if ((!in_array($extension, $authorizedExtensions))) {
                return new JsonResponse(['id' => 3, 'data' => 'Please select jpg, jpeg, png or gif']);
            }
            if (file_exists($_FILES['file']['tmp_name']) && filesize($_FILES['file']['tmp_name']) > $maxFileSize) {
                return new JsonResponse(['id' => 4, 'data' => 'Please select a file size smaller than 1M.']);
            }
            if ($_FILES['file']['error'] === 0) {
                move_uploaded_file($tmp_file_name, $new_file_name);
                return new JsonResponse(['id' => 0, 'data' => 'Uploaded successfully', 'path' => 'src/uploads/posts_picture/', 'size' => $file_size, 'name' => basename($uniqid) . '.' . $extension]);
            } else {
                return new JsonResponse(['id' => 1, 'data' => 'Failed to upload file']);
            }
        } else {
            return new JsonResponse(['id' => 2, 'data' => 'No file selected']);
        }
    }
}
