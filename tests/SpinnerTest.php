<?php

namespace App\Tests;

use \App\Repository\AccountProfileRepository;
use App\Service\RouletteService;
use App\Service\SpinnerService;
use Doctrine\Persistence\ManagerRegistry;
use \Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class SpinnerTest extends KernelTestCase
{
    private ManagerRegistry $registry;

    protected function setUp(): void
    {
        parent::setUp();
        self::bootKernel();
        $this->registry = $this->getContainer()->get('doctrine');
    }

    public function testSpinner()
    {
        $test_account_1 = (new AccountProfileRepository($this->registry))->findOneBy(["player_id"=>66]);
        $initial_amount_1 = $test_account_1->getMoney();
        $test_account_2 = (new AccountProfileRepository($this->registry))->findOneBy(["player_id"=>77]);
        $initial_amount_2 = $test_account_2->getMoney();

        $game_id = (new SpinnerService())->checkGame($this->registry);
        (new SpinnerService())->addParticipant($this->registry, ["id"=>66,"suma"=>10,"game_id"=>$game_id]);
        (new SpinnerService())->addParticipant($this->registry, ["id"=>77,"suma"=>10,"game_id"=>$game_id]);
        (new SpinnerService())->getWinner($this->registry, $game_id);

        $test_account_1 = (new AccountProfileRepository($this->registry))->findOneBy(["player_id"=>66]);
        $last_amount_1 = $test_account_1->getMoney();
        $test_account_2 = (new AccountProfileRepository($this->registry))->findOneBy(["player_id"=>77]);
        $last_amount_2 = $test_account_2->getMoney();
        if(!($initial_amount_1 == $last_amount_1 - 10 or $initial_amount_2 == $last_amount_2 - 10)){
            $this->assertEquals(1, 0);
        }
        $this->assertEquals($initial_amount_1 + $initial_amount_2, $last_amount_1 + $last_amount_2);

    }
}