<?php

namespace App\Entity;

use App\Repository\CrashHistoryRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CrashHistoryRepository::class)]
class CrashHistory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $id_jucator = null;

    #[ORM\Column]
    private ?float $suma = null;

    #[ORM\Column]
    private ?float $exited_at = null;

    #[ORM\Column]
    private ?int $game_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdJucator(): ?string
    {
        return $this->id_jucator;
    }

    public function setIdJucator(float $id_jucator): self
    {
        $this->id_jucator = $id_jucator;

        return $this;
    }

    public function getSuma(): ?string
    {
        return $this->suma;
    }

    public function setSuma(float $suma): self
    {
        $this->suma = $suma;

        return $this;
    }

    public function getExitedAt(): ?string
    {
        return $this->exited_at;
    }

    public function setExitedAt(float $exited_at): self
    {
        $this->exited_at = $exited_at;

        return $this;
    }

    public function getGameId(): ?int
    {
        return $this->game_id;
    }

    public function setGameId(int $game_id): self
    {
        $this->game_id = $game_id;

        return $this;
    }
}
