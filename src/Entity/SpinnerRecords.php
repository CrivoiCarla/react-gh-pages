<?php

namespace App\Entity;

use App\Repository\SpinnerRecordsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SpinnerRecordsRepository::class)]
class SpinnerRecords
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $winner = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $sum = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId($id): self{
        $this->id = $id;
        return $this;
    }

    public function getWinner(): ?string
    {
        return $this->winner;
    }

    public function setWinner(string $winner): self
    {
        $this->winner = $winner;

        return $this;
    }

    public function getSum(): ?string
    {
        return $this->sum;
    }

    public function setSum(string $sum): self
    {
        $this->sum = $sum;

        return $this;
    }
}
