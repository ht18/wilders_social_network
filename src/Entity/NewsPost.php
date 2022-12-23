<?php

namespace App\Entity;

use App\Repository\NewsPostRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NewsPostRepository::class)]
class NewsPost
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $Pseudo = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $Picture = null;

    #[ORM\Column(length: 255)]
    private ?string $Topic = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $Content = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $pictureSize = null;

    #[ORM\Column(nullable: true)]

    private ?int $Likes = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPseudo(): ?string
    {
        return $this->Pseudo;
    }

    public function setPseudo(string $Pseudo): self
    {
        $this->Pseudo = $Pseudo;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->Picture;
    }

    public function setPicture(?string $Picture): self
    {
        $this->Picture = $Picture;

        return $this;
    }

    public function getTopic(): ?string
    {
        return $this->Topic;
    }

    public function setTopic(string $Topic): self
    {
        $this->Topic = $Topic;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->Content;
    }

    public function setContent(string $Content): self
    {
        $this->Content = $Content;

        return $this;
    }

    public function getpictureSize(): ?int
    {
        return $this->pictureSize;
    }

    public function setPictureSize(?string $pictureSize): self
    {
        $this->pictureSize = $pictureSize;

        return $this;
    }

    public function getLikes(): ?int
    {
        return $this->Likes;
    }

    public function setLikes(?int $Likes): self
    {
        $this->Likes = $Likes;

        return $this;
    }
}
