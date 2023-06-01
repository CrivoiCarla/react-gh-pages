<?php

namespace App\Tests;

use App\Controller\CrashController;
use \App\Repository\AccountProfileRepository;
use App\Service\CrashService;
use App\Service\RouletteService;
use App\Service\SpinnerService;
use Doctrine\Persistence\ManagerRegistry;
use \Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\HttpFoundation\Request;

class CrashTest extends KernelTestCase
{
    private ManagerRegistry $registry;
    public const ID_TEST_ACCOUNT = 66;
    public const TEST_BET = 10;
    public CrashController $crashController;
    public AccountProfileRepository $accountProfileRepository;
    public CrashService $crashService;

    protected function setUp(): void
    {
        parent::setUp();
        self::bootKernel();
        $this->registry = $this->getContainer()->get('doctrine');
        $this->crashController = new CrashController($this->registry);
        $this->accountProfileRepository = new AccountProfileRepository($this->registry);
        $this->crashService = new CrashService($this->registry);
    }

    public function testCrash(){
        $game_id = $this->crashService->getLastGame();
        $test_account = $this->accountProfileRepository->findOneBy(["player_id"=> self::ID_TEST_ACCOUNT]);
        $initial_amount = $test_account->getMoney();
        $this->crashService->placeBet(["id_jucator"=> self::ID_TEST_ACCOUNT,"suma"=> self::TEST_BET]);

        $multiplier = $this->crashService->getMultiplier();

        $this->crashService->cashout(["id_jucator"=> self::ID_TEST_ACCOUNT,"multiplier"=>$multiplier - 0.01]);
        $this->crashService->giveMoney($game_id);
        $updated_account = $this->accountProfileRepository ->findOneBy(["player_id"=> self::ID_TEST_ACCOUNT]);

        $this->assertEquals(floatval(number_format($initial_amount +  self::TEST_BET * ($multiplier - 1.01),2, '.', '')), $updated_account->getMoney());
    }

    public function testEndpoint(){
        $game_id = json_decode($this->crashController->getCrashId()->getContent(),true)["id"];
        $test_account = $this->accountProfileRepository ->findOneBy(["player_id"=> self::ID_TEST_ACCOUNT]);
        $initial_amount = $test_account->getMoney();
        $request = new Request(
            $query = [],
            $request = [],
            $attributes = [],
            $cookies = [],
            $files = [],
            $server = [],
            $content = json_encode([
                "id_jucator"=>self::ID_TEST_ACCOUNT,
                "suma"=>self::TEST_BET
            ])
        );
        $response = $this->crashController->placeBet($request);
        $multiplier = json_decode($this->crashController->getMultiplierCrash()->getContent(),true)["multiplier"];
        $request = new Request(
            $query = [],
            $request = [],
            $attributes = [],
            $cookies = [],
            $files = [],
            $server = [],
            $content = json_encode([
                "id_jucator"=>self::ID_TEST_ACCOUNT,
                "multiplier"=>$multiplier - 0.01
            ])
        );

        $response = $this->crashController->cashout($request);
        $game_id = json_decode($this->crashController->getCrashId()->getContent(),true)["id"];

        $updated_account = $this->accountProfileRepository ->findOneBy(["player_id"=> self::ID_TEST_ACCOUNT]);

        $this->assertEquals(floatval(number_format($initial_amount +  self::TEST_BET * ($multiplier - 1.01),2, '.', '')), $updated_account->getMoney());
    }

}