<?php

namespace App\Service;

use App\Entity\SpinnerHistory;
use App\Entity\SpinnerRecords;
use App\Repository\AccountProfileRepository;
use App\Repository\SpinnerHistoryRepository;
use App\Repository\SpinnerRecordsRepository;
use Doctrine\Persistence\ManagerRegistry;
use Monolog\Registry;

class SpinnerService
{
    public ManagerRegistry $registry;
    public SpinnerRecordsRepository $spinnerRecordsRepository;
    public AccountProfileRepository $accountProfileRepository;
    public SpinnerHistoryRepository $spinnerHistoryRepository;
    public function __construct(ManagerRegistry $registry)
    {
        $this->registry = $registry;
        $this->spinnerRecordsRepository = new SpinnerRecordsRepository($registry);
        $this->accountProfileRepository = new AccountProfileRepository($registry);
        $this->spinnerHistoryRepository = new SpinnerHistoryRepository($registry);
    }
    public function checkGame(){
        $last_record = $this->spinnerRecordsRepository->findLastRecord();
        if($last_record->getWinner() != null){
            $this->createGame();
            $last_record = $this->spinnerRecordsRepository->findLastRecord();
        }
        return $last_record->getId();
    }
    public function createGame(){
        $newGame = new SpinnerRecords();
        return $this->spinnerRecordsRepository->save(new SpinnerRecords());
    }

    public function addParticipant(array $info){
        $account_info = $this->accountProfileRepository->removeMoney($info["id"],$info["suma"]);
        if($account_info == false){
            return false;
        }
        $newParticipant = new SpinnerHistory();
        $newParticipant->setGameId($info["game_id"]);
        $newParticipant->setPlayerId($info["id"]);
        $newParticipant->setSum($info["suma"]);

        $this->spinnerHistoryRepository->save($newParticipant);
    }

    public function getParticipants(int $game_id){
        $players = $this->spinnerHistoryRepository->findBy(["game_id"=>$game_id]);

        $returned_players = [];
        foreach($players as $player){
            $player_info = $this->accountProfileRepository->findOneBy(["player_id"=>$player->getPlayerId()]);

            $returned_players[] = json_encode([
                "name" => $player_info->getName(),
                "suma" => $player->getSum(),
                "photo" => $player_info->getPhoto()
            ]);
        }

        return $returned_players;
    }

    public function getWinner(int $game_id){
        $players = $this->spinnerHistoryRepository->findBy(["game_id"=>$game_id]);
        $players_ids = [];
        $players_sum = [];
        foreach($players as $player){
            $players_ids[] = $player->getPlayerId();

            $players_sum[] = $player->getSum();
        }
        $winner = $players_ids[$this->calculateWinner($players_sum)];
        $totalMoneyWon = array_sum($players_sum);

        $this->accountProfileRepository->addMoney($winner, $totalMoneyWon);

        $update_record = $this->spinnerRecordsRepository->findOneBy(["id"=>$game_id]);

        $update_record->setSum($totalMoneyWon);
        $update_record->setWinner($winner);

        $this->spinnerRecordsRepository->save($update_record);
        $this->spinnerHistoryRepository->removeArray($players);
        $account_info = $this->accountProfileRepository->findOneBy(["player_id" => $winner]);

        return [
            "name" => $account_info->getName(),
            "photo" => $account_info->getPhoto()
        ];
    }

    function calculateWinner(array $numbers): int {
        $total = array_sum($numbers);
        $random = mt_rand(1, $total);
        $sum = 0;

        foreach ($numbers as $index => $number) {
            $sum += $number;
            if ($random <= $sum) {
                return $index;
            }
        }
        return -1;
    }
}