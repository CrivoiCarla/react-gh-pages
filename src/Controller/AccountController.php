<?php

namespace App\Controller;

use App\Service\AccountService;
use App\Service\RouletteService;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Util\Json;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountController extends AbstractController
{
    public AccountService $account_service;
    public function __construct(ManagerRegistry $managerRegistry)
    {
        $this->account_service = new AccountService($managerRegistry);
    }
    /*
     * Request example:
     * {
     * "username":"AlexSmecherul",
     * "password":"alexESmecher1!A",
     * "email":"alex@yahoo.com",
     * "phone_number":"0770123456",
     * "name":"Popescu",
     * "surname":"Alexandru",
     * "age":18
     * }
     */
    #[Route('/v1/register', name: 'app_register', methods: ['POST'])]
    public function registerAccount(Request $request): Response
    {
        $account_info = json_decode($request->getContent(), true);
        $response = $this->account_service->checkFields($account_info);

        if ($response["response"]) {
            $this->account_service->saveAccount($account_info);
        }

        return new JsonResponse($response);
    }
    /*
        * Request example:
        * {
        * "username":"AlexSmecherul",
        * "password":"alexESmecher1!A",
        * }
        */

    #[Route('/v1/login', name: 'app_login', methods:['POST'])]
    public function loginAccount(Request $request): Response
    {
        $account_info = json_decode($request->getContent(),true);
        $response = $this->account_service->checkAccount($account_info);
        if($response){
            return new JsonResponse([
                "succes" => true
            ]);
        }
        return new JsonResponse([
            "succes" => false
        ]);
    }
}