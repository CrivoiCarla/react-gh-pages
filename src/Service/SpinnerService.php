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
    public function createGame(ManagerRegistry $registry){
        $newGame = new SpinnerRecords();
        return (new SpinnerRecordsRepository($registry))->save(new SpinnerRecords());
    }

    public function addParticipant(ManagerRegistry $registry, array $info){
        $account_info = (new AccountProfileRepository($registry))->removeMoney($info["id"],$info["suma"]);

        $newParticipant = new SpinnerHistory();
        $newParticipant->setGameId($info["game_id"]);
        $newParticipant->setPlayerId($info["id"]);
        $newParticipant->setSum($info["suma"]);

        (new SpinnerHistoryRepository($registry))->save($newParticipant);
    }

    public function getParticipants(ManagerRegistry $registry, int $game_id){
        $players = (new SpinnerHistoryRepository($registry))->findBy(["game_id"=>$game_id]);

        $returned_players = [];
        foreach($players as $player){
            $player_info = (new AccountProfileRepository($registry))->findOneBy(["player_id"=>$player->getPlayerId()]);

            $returned_players[] = json_encode([
                "name" => $player_info->getName(),
                "suma" => $player->getSum(),
                "photo" => $player_info->getPhoto()
            ]);
        }

        return $returned_players;
    }

    public function getWinner(ManagerRegistry $registry, int $game_id){
        $players = (new SpinnerHistoryRepository($registry))->findBy(["game_id"=>$game_id]);
        $players_ids = [];
        $players_sum = [];
        foreach($players as $player){
            $players_ids[] = $player->getPlayerId();

            $players_sum[] = $player->getSum();
        }
        $winner = $players_ids[$this->calculateWinner($players_sum)];
        $totalMoneyWon = array_sum($players_sum);

        (new AccountProfileRepository($registry))->addMoney($winner, $totalMoneyWon);

        $update_record = (new SpinnerRecordsRepository($registry))->findOneBy(["id"=>$game_id]);

        $update_record->setSum($totalMoneyWon);
        $update_record->setWinner($winner);

        (new SpinnerRecordsRepository($registry))->save($update_record);
        (new SpinnerHistoryRepository($registry))->removeArray($players);
        $account_info = (new AccountProfileRepository($registry))->findOneBy(["player_id" => $winner]);

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