<?php

namespace App\Tests;

use \App\Repository\AccountProfileRepository;
use App\Service\CrashService;
use App\Service\RouletteService;
use App\Service\SpinnerService;
use Doctrine\Persistence\ManagerRegistry;
use \Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class CrashTest extends KernelTestCase
{
    private ManagerRegistry $registry;

    protected function setUp(): void
    {
        parent::setUp();
        self::bootKernel();
        $this->registry = $this->getContainer()->get('doctrine');
    }

    public function testCrash(){
        $game_id = (new CrashService())->getLastGame($this->registry);
        $test_account = (new AccountProfileRepository($this->registry))->findOneBy(["player_id"=>66]);
        $initial_amount = $test_account->getMoney();
        (new CrashService())->placeBet($this->registry, ["id_jucator"=> 66,"suma"=>10]);

        $multiplier = (new CrashService())->getMultiplier($this->registry);

        (new CrashService())->cashout($this->registry, ["id_jucator"=>66,"multiplier"=>$multiplier - 0.01]);
        (new CrashService())->giveMoney($this->registry, $game_id);
        $updated_account = (new AccountProfileRepository($this->registry))->findOneBy(["player_id"=>66]);

        $this->assertEquals($initial_amount + 10 * ($multiplier - 1.01), $updated_account->getMoney());
    }

}