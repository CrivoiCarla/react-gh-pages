<?php

namespace App\Service;

use App\Repository\AccountProfileRepository;
use Symfony\Bridge\Doctrine\ManagerRegistry;

class RouletteService
{
    public const CHANCE_TRANSLATION = [
        10,
        0,
        2,
        40,
        10,
        100,
        20,
        0,
        100,
        1000
    ];
    public const CHANCE_OPTIONS = [
        [0,40], //4% => 10$
        [41,530], //48.9% => Lose
        [531,774], // 24.3% => 2$
        [775,780], // 2.5% => 40$
        [781,800], // 2% => 10$
        [801,801], // 0.1% => 100$
        [802,815], // 1.4% => 20$
        [816,998], // 18.2% => Lose
        [999,999], // 0.1% => 100$
        [1000,1000], // 0.0001% => 1000$
        // In total imi da 101.5%, asa ca bine ca nu am mers pe mate
    ];

    public function getNumber($id, ManagerRegistry $registry){
        (new AccountProfileRepository($registry))->removeMoney($id, 2);

        $random = rand(0,1000);
        if($random == 1000){
            $random = rand(0,1000);
        }
        for($i=0;$i<count(self::CHANCE_OPTIONS);$i++){
            if(self::CHANCE_OPTIONS[$i][0] <= $random and $random <= self::CHANCE_OPTIONS[$i][1]){
                (new AccountProfileRepository($registry))->addMoney($id, self::CHANCE_TRANSLATION[$i]);
                return $i;
            }
        }

    }
}