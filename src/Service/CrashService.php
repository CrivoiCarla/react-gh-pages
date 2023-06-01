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
    public ManagerRegistry $registry;
    public CrashRepository $crashRepository;
    public CrashHistoryRepository $crashHistoryRepository;
    public AccountProfileRepository $accountProfileRepository;

    public function __construct(ManagerRegistry $registry)
    {
        $this->registry = $registry;
        $this->crashRepository = new CrashRepository($registry);
        $this->crashHistoryRepository = new CrashHistoryRepository($registry);
        $this->accountProfileRepository = new AccountProfileRepository($registry);
    }
    public function getLastGame(){
        $last_record = $this->crashRepository->findLastRecord($this->registry);
        if(!isset($last_record) or $last_record->getFinalizat() == "YES"){
            $this->giveMoney($last_record->getId());
            $this->createGame();
            $last_record = $this->crashRepository->findLastRecord();
        }
        return $last_record->getId();
    }

    public function createGame(){
            $game = new Crash();
            $game->setTimestamp((new \DateTimeImmutable())->getTimestamp());
            $game->setMultiplier(1);
            $game->setFinalizat("NO");
            $this->crashRepository->save($game);
    }

    public function getMultiplier(){

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
        $last_record = $this->crashRepository->findLastRecord();
        if($last_record->getFinalizat() == "NO") {
            $last_record->setMultiplier($x);
            $last_record->setFinalizat("YES");
            $this->crashRepository->save($last_record);
            return $x;
        }
    }

    public function placeBet($info){
        $last_record = $this->crashRepository->findLastRecord();

        $account_info = $this->accountProfileRepository->removeMoney($info["id_jucator"],$info["suma"]);

        $new_better = new CrashHistory();
        $new_better->setIdJucator($info["id_jucator"])
            ->setSuma($info["suma"])
            ->setGameId($last_record->getId())
            ->setExitedAt(0.0);

        $this->crashHistoryRepository->save($new_better);

        $this->crashRepository->save($last_record);
    }

    public function cashout($info){
        $last_record = $this->crashRepository->findLastRecord();

        $bet = $this->crashHistoryRepository->findOneBy(["id_jucator"=>$info["id_jucator"],"game_id"=>$last_record->getId()]);
        $bet->setExitedAt($info["multiplier"]);

        $this->crashHistoryRepository->save($bet);
    }

    public function giveMoney($game_id){
        $last_record = $this->crashRepository->findLastRecord();
        $bets = $this->crashHistoryRepository->findBy(["game_id"=>$game_id]);

        foreach($bets as $bet){
            if($bet->getExitedAt() < $last_record->getMultiplier()) {
                $this->accountProfileRepository->addMoney($bet->getIdJucator(), $bet->getSuma() * $bet->getExitedAt());
            }
            $this->crashHistoryRepository->remove($bet);
        }
    }
}