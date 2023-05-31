<?php

namespace App\Entity;

use App\Repository\CrashRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CrashRepository::class)]
class Crash
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $timestamp = null;

    #[ORM\Column(length: 255)]
    private ?string $finalizat = null;

    #[ORM\Column(nullable: true)]
    private ?float $multiplier = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTimestamp(): ?string
    {
        return $this->timestamp;
    }

    public function setTimestamp(string $timestamp): self
    {
        $this->timestamp = $timestamp;

        return $this;
    }

    public function getFinalizat(): ?string
    {
        return $this->finalizat;
    }

    public function setFinalizat(string $finalizat): self
    {
        $this->finalizat = $finalizat;

        return $this;
    }

    public function getMultiplier(): ?float
    {
        return $this->multiplier;
    }

    public function setMultiplier(?float $multiplier): self
    {
        $this->multiplier = $multiplier;

        return $this;
    }
}
