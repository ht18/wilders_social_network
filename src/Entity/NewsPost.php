<?php

namespace App\Entity;

use App\Repository\NewsPostRepository;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\DBAL\Types\Types;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\User;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: NewsPostRepository::class)]
#[ApiResource()]
class NewsPost
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]

    private ?string $Pseudo = null;

    #[ORM\Column(type: Types::TEXT)]

    private ?string $Picture = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotNull]

    private ?string $Topic = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotNull]

    private ?string $Content = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]

    private ?string $ContentImg = null;

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

    public function setPicture(string $Picture): self
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

    public function getContentImg(): ?string
    {
        return $this->ContentImg;
    }

    public function setContentImg(?string $ContentImg): self
    {
        $this->ContentImg = $ContentImg;

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
