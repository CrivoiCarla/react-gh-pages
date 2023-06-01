<?php

namespace App\Tests;

use App\Controller\RouletteController;
use \App\Repository\AccountProfileRepository;
use App\Service\RouletteService;
use Doctrine\Persistence\ManagerRegistry;
use http\Client;
use Symfony\Component\HttpFoundation\Request;
use PHPUnit\Framework\KernelTestCase;


class RouletteTest extends \Symfony\Bundle\FrameworkBundle\Test\KernelTestCase
{
    public const ID_TEST_ACCOUNT= 66;
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
    private ManagerRegistry $registry;
    public AccountProfileRepository $accountProfileRepository;
    public RouletteService $rouletteService;
    public RouletteController $rouletteController;
    protected function setUp(): void
    {
        parent::setUp();
        self::bootKernel();
        $this->registry = $this->getContainer()->get('doctrine');
        $this->accountProfileRepository = new AccountProfileRepository($this->registry);
        $this->rouletteService = new RouletteService($this->registry);
        $this->rouletteController = new RouletteController($this->registry);
    }
    public function testRoulette()
    {
        $test_account = $this->accountProfileRepository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT]);
        $initial_amount = $test_account->getMoney();
        $number_returned = $this->rouletteService->getNumber(self::ID_TEST_ACCOUNT, $this->registry);
        $updated_account = $this->accountProfileRepository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT]);
        $this->assertEquals($initial_amount - 2 + self::CHANCE_TRANSLATION[$number_returned], $updated_account->getMoney());
    }
    public function testEndpoint()
    {
        $request = new Request(
            $query = [],
            $request = [],
            $attributes = [],
            $cookies = [],
            $files = [],
            $server = [],
            $content = json_encode([
                "id"=>self::ID_TEST_ACCOUNT
            ])
        );

        $test_account = $this->accountProfileRepository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT]);
        $initial_amount = $test_account->getMoney();

        $response = $this->rouletteController->returnRoulette($request);
        $decoded = json_decode($response->getContent(), true);

        $updated_account = $this->accountProfileRepository->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT]);
        $this->assertEquals($initial_amount - 2 + self::CHANCE_TRANSLATION[$decoded["number"]], $updated_account->getMoney());
    }
}
