<?php

namespace App\Tests;

use \App\Repository\AccountProfileRepository;
use App\Service\RouletteService;
use Doctrine\Persistence\ManagerRegistry;
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

    protected function setUp(): void
    {
        parent::setUp();
        self::bootKernel();
        $this->registry = $this->getContainer()->get('doctrine');
    }
    public function testRoulette()
    {
        $test_account = (new AccountProfileRepository($this->registry))->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT]);
        $initial_amount = $test_account->getMoney();
        $number_returned = (new RouletteService())->getNumber(self::ID_TEST_ACCOUNT, $this->registry);
        $updated_account = (new AccountProfileRepository($this->registry))->findOneBy(["player_id"=>self::ID_TEST_ACCOUNT]);
        $this->assertEquals($initial_amount - 2 + self::CHANCE_TRANSLATION[$number_returned], $updated_account->getMoney());

    }
}
