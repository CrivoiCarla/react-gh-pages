<?php

namespace App\Tests;

use App\Controller\SpinnerController;
use \App\Repository\AccountProfileRepository;
use App\Service\RouletteService;
use App\Service\SpinnerService;
use Doctrine\Persistence\ManagerRegistry;
use \Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\HttpFoundation\Request;

class SpinnerTest extends KernelTestCase
{
    private ManagerRegistry $registry;
    public SpinnerService $spinner_service;
    public AccountProfileRepository $account_profile_repository;
    public SpinnerController $spinner_controller;

    public const ID_TEST_ACCOUNT_1 = 66;
    public const ID_TEST_ACCOUNT_2 = 77;

    public const BET_AMOUNT = 10;

    protected function setUp(): void
    {
        parent::setUp();
        self::bootKernel();
        $this->registry = $this->getContainer()->get('doctrine');
        $this->account_profile_repository = new AccountProfileRepository($this->registry);
        $this->spinner_service = new SpinnerService($this->registry);
        $this->spinner_controller = new SpinnerController($this->registry);
    }

    public function testSpinner()
    {
        $test_account_1 = $this->account_profile_repository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT_1]);
        $initial_amount_1 = $test_account_1->getMoney();
        $test_account_2 = $this->account_profile_repository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT_2]);
        $initial_amount_2 = $test_account_2->getMoney();

        $game_id = $this->spinner_service->checkGame($this->registry);
        $this->spinner_service->addParticipant(["id"=>self::ID_TEST_ACCOUNT_1,"suma"=>self::BET_AMOUNT,"game_id"=>$game_id]);
        $this->spinner_service->addParticipant(["id"=>self::ID_TEST_ACCOUNT_2,"suma"=>self::BET_AMOUNT,"game_id"=>$game_id]);
        $this->spinner_service->getWinner($game_id);

        $test_account_1 = $this->account_profile_repository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT_1]);
        $last_amount_1 = $test_account_1->getMoney();
        $test_account_2 = $this->account_profile_repository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT_2]);
        $last_amount_2 = $test_account_2->getMoney();
        if(!($initial_amount_1 == $last_amount_1 - self::BET_AMOUNT or $initial_amount_2 == $last_amount_2 - self::BET_AMOUNT)){
            $this->assertEquals(1, 0);
        }
        $this->assertEquals($initial_amount_1 + $initial_amount_2, $last_amount_1 + $last_amount_2);

    }

    public function testEndpoint(){

        $test_account_1 = $this->account_profile_repository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT_1]);
        $initial_amount_1 = $test_account_1->getMoney();
        $test_account_2 = $this->account_profile_repository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT_2]);
        $initial_amount_2 = $test_account_2->getMoney();

        $game_id = json_decode($this->spinner_controller->getID()->getContent(),true)["id"];

        $request = new Request(
            $query = [],
            $request = [],
            $attributes = [],
            $cookies = [],
            $files = [],
            $server = [],
            $content = json_encode([
                "id"=>self::ID_TEST_ACCOUNT_1,
                "game_id"=>$game_id,
                "suma"=>self::BET_AMOUNT,
            ])
        );

        $this->spinner_controller->addParticipant($request);

        $request = new Request(
            $query = [],
            $request = [],
            $attributes = [],
            $cookies = [],
            $files = [],
            $server = [],
            $content = json_encode([
                "id"=>self::ID_TEST_ACCOUNT_2,
                "game_id"=>$game_id,
                "suma"=>self::BET_AMOUNT,
            ])
        );

        $this->spinner_controller->addParticipant($request);

        $request = new Request(
            $query = ["id" => $game_id],
            $request = [],
            $attributes = [],
            $cookies = [],
            $files = [],
            $server = [],
            $content = []
        );

        $this->spinner_controller->chooseWinner($request);

        $test_account_1 = $this->account_profile_repository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT_1]);
        $last_amount_1 = $test_account_1->getMoney();
        $test_account_2 = $this->account_profile_repository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT_2]);
        $last_amount_2 = $test_account_2->getMoney();
        if(!($initial_amount_1 == $last_amount_1 - self::BET_AMOUNT or $initial_amount_2 == $last_amount_2 - self::BET_AMOUNT)){
            echo $initial_amount_1 . " " . $last_amount_1 . " " . $initial_amount_2 . " " . $last_amount_2;
            $this->assertEquals(1, 0);
        }
        $this->assertEquals($initial_amount_1 + $initial_amount_2, $last_amount_1 + $last_amount_2);
    }
}