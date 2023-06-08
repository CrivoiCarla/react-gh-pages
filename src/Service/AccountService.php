<?php

namespace App\Service;


use App\Entity\Account;
use App\Repository\AccountProfileRepository;
use App\Repository\AccountRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectRepository;

class AccountService
{
    public ManagerRegistry $managerRegistry;
    public AccountRepository $accountRepository;
    public AccountProfileRepository $accountProfileRepository;
    public function __construct(ManagerRegistry $managerRegistry){
        $this->managerRegistry = $managerRegistry;
        $this->accountRepository = new AccountRepository($managerRegistry);
        $this->accountProfileRepository = new AccountProfileRepository($managerRegistry);
    }
    /*
     *      * {
     * "username":"AlexSmecherul",
     * "password":"alexESmecher1!A",
     * "phone_number":"0770123456",
     * "name":"Popescu",
     * "surname":"Alexandru",
     * "age":18
     * }
     */
    public function checkFields(array $account_fields)
    {

        $check = $this->validateRequest($account_fields);
        if(!$check["response"]){
            $this->saveAccount($account_fields);
        }

        $response = [
            "response" => !$check["response"],
            "error" => $check["error"]
        ];


        return $response;
    }

    public function validateRequest(array $account_fields )
    {
        $response = "Check fields:";
        $error = false;

        if (!isset($account_fields["username"]) or empty($account_fields["username"])) {
            $response .= "username;";
            $error = true;
        }
        if (!isset($account_fields["password"]) or empty($account_fields["password"])) {
            $response .= "password;";
            $error = true;
        } else if (!$this->validatePassword($account_fields["password"])) {
            $response .= "Your password is not strong enough;";
            $error = true;
        }
        if (!isset($account_fields["phone_number"]) or empty($account_fields["phone_number"])) {
            $response .= "phone_number;";
            $error = true;
        }
        if (!isset($account_fields["name"]) or empty($account_fields["name"])) {
            $response .= "name;";
            $error = true;
        }
        if (!isset($account_fields["surname"]) or empty($account_fields["surname"])) {
            $response .= "surname;";
            $error = true;
        }
        if (!isset($account_fields["age"]) or empty($account_fields["age"])) {
            $response .= "age;";
            $error = true;
        } elseif ($account_fields["age"] < 18) {
            $response = "You're too young to gamble;";
            $error = true;
        }

        if ($this->accountRepository->checkExistence($account_fields)) {
            $response = "You already have an account with us;";
            $error = true;
        }

        return [
            "response" => $error,
            "error" => $error == true ? $response : ""
        ];
    }

    function validatePassword($password)
    {
        $pattern = '/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}$/';

        if (preg_match($pattern, $password)) {
            return true; // Password is valid
        } else {
            return false; // Password is invalid
        }
    }

    public function saveAccount(array $account_fields)
    {
        $this->accountRepository->addAccount($account_fields);
        $player_id = $this->accountRepository->findLastRecord();
        $this->accountProfileRepository->addAccountProfile($account_fields, $player_id->getId());
    }

    public function checkAccount(array $account_fields){
        $account_info = $this->accountRepository->loginAccount($account_fields);
        if($account_info) {
            $account_info_array = [];
            $account_info_array["id"] = $account_info->getId();
            $account_info_array["username"] = $account_info->getUsername();
            $account_info_array["password"] = $account_info->getPassword();
            $account_info_array["mail"] = $account_info->getMail();
            $account_info_array["phone_number"] = $account_info->getPhoneNumber();
            $account_info_array["name"] = $account_info->getName();
            $account_info_array["surname"] = $account_info->getSurname();
            $account_info_array["age"] = $account_info->getAge();
            $account_profile = $this->accountProfileRepository->getAccountDetails($account_info);
            $account_info_array["account_profile"]["photo"] = $account_profile->getPhoto();
            $account_info_array["account_profile"]["money"] = $account_profile->getMoney();
            return $account_info_array;
        }
    }
}