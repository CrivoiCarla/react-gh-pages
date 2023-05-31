<?php

namespace App\Service;

use App\Entity\Crash;
use App\Entity\CrashHistory;
use App\Repository\AccountProfileRepository;
use App\Repository\CrashHistoryRepository;
use App\Repository\CrashRepository;
use Monolog\DateTimeImmutable;
use Symfony\Bridge\Doctrine\ManagerRegistry;

class CrashService
{
    public function getLastGame(ManagerRegistry $registry){
        $last_record = (new CrashRepository($registry))->findLastRecord($registry);
        if(!isset($last_record) or $last_record->getFinalizat() == "YES"){
            $this->giveMoney($registry, $last_record->getId());
            $this->createGame($registry);
            $last_record = (new CrashRepository($registry))->findLastRecord($registry);
        }
        return $last_record->getId();
    }

    public function createGame(ManagerRegistry $registry){
            $game = new Crash();
            $game->setTimestamp((new \DateTimeImmutable())->getTimestamp());
            $game->setMultiplier(1);
            $game->setFinalizat("NO");
            (new CrashRepository($registry))->save($game);
    }

    public function getMultiplier(ManagerRegistry $registry){

        // Function made by ChatGPT to generate a multiplier with a bias towards lower values
            $randomValue = mt_rand() / mt_getrandmax();

            if ($randomValue <= 0.65) {
                $x = 1 + (mt_rand() / mt_getrandmax());
            } elseif ($randomValue <= 0.9) {
                $x = 2 + (mt_rand() / mt_getrandmax());
            } elseif ($randomValue <= 0.99) {
                $x = 3 + (mt_rand() / mt_getrandmax());
            } else {
                $x = 4 + (mt_rand() / mt_getrandmax());
            }
        $x = floatval(number_format($x, 2, '.', ''));
        $last_record = (new CrashRepository($registry))->findLastRecord($registry);
        if($last_record->getFinalizat() == "NO") {
            $last_record->setMultiplier($x);
            $last_record->setFinalizat("YES");
            (new CrashRepository($registry))->save($last_record);
            return $x;
        }
    }

    public function placeBet(ManagerRegistry $registry, $info){
        $last_record = (new CrashRepository($registry))->findLastRecord($registry);

        $account_info = (new AccountProfileRepository($registry))->removeMoney($info["id_jucator"],$info["suma"]);

        $new_better = new CrashHistory();
        $new_better->setIdJucator($info["id_jucator"])
            ->setSuma($info["suma"])
            ->setGameId($last_record->getId())
            ->setExitedAt(0.0);

        (new CrashHistoryRepository($registry))->save($new_better);

        (new CrashRepository($registry))->save($last_record);
    }

    public function cashout(ManagerRegistry $registry,$info){
        $last_record = (new CrashRepository($registry))->findLastRecord($registry);

        $bet = (new CrashHistoryRepository($registry))->findOneBy(["id_jucator"=>$info["id_jucator"]]);
        $bet->setExitedAt($last_record->getMultiplier());

        (new CrashHistoryRepository($registry))->save($bet);
    }

    public function giveMoney(ManagerRegistry $registry, $game_id){
        $last_record = (new CrashRepository($registry))->findLastRecord($registry);
        $bets = (new CrashHistoryRepository($registry))->findBy(["game_id"=>$game_id]);

        foreach($bets as $bet){
            if($bet->getExitedAt() < $last_record->getMultiplier()) {
                (new AccountProfileRepository($registry))->addMoney($bet->getIdJucator(), $bet->getSuma() * $bet->getExitedAt());
            }
            (new CrashHistoryRepository($registry))->remove($bet);
        }
    }
}