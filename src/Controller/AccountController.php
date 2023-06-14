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
     * "age":18,
     * "account_photo":"https://link.com"
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
     * Response example:
     * {
     * "response":false,
     * "error":"Check fields:username;password;Your password is not strong enough;"
     * }
     */
    /*
        * Request example:
        * {
        * "email":"AlexSmecherul",
        * "password":"alexESmecher1!A",
        * }
        */

    #[Route('/v1/login', name: 'app_login', methods:['POST'])]
    public function loginAccount(Request $request): Response
    {
        $account_info = json_decode($request->getContent(),true);
        $response = $this->account_service->checkAccount($account_info);
        if($response){
            return new JsonResponse($response);
        }
        return new JsonResponse([
            "succes" => false
        ]);
    }
  
    /*
     * Example response body
     * {
     * "id":1,
     * "username":"AlexSmecherul",
     * "password":"alexESmecher1!A",
     * "mail":"a@yahoo.com",
     * "phone_number":"0770123456",
     * "name":"Popescu",
     * "surname":"Alexandru",
     * "age":18,
     * "account_profile":{
     *     "photo":"https://link.com",
     *    "money":1000
     * }
     * }
     */

    /*
        * Request example:
        * {
     *    "id":77,
        * "password":"alexESmecher1!A",
        * }
        */
    #[Route('/v1/changepass', name: 'app_change_pass', methods:['POST'])]
    public function changePass(Request $request): Response
    {
        $account_info = json_decode($request->getContent(),true);
        $response = $this->account_service->changePass($account_info);
        if($response){
            return new JsonResponse([
                "succes" => true
            ]);
        }
        return new JsonResponse([
            "succes" => false
        ]);
    }
    // Dau true sau false

    /*
        * Request example:
        * {
        * "id":77,
        * "money":100,
        * }
        */
    #[Route('/v1/setmoney', name: 'app_set_money', methods:['POST'])]
    public function setMoney(Request $request): Response
    {
        $account_info = json_decode($request->getContent(),true);
        $response = $this->account_service->setMoney($account_info);
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