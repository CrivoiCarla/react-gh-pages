<?php

namespace App\Controller;

use App\Service\RouletteService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RouletteController extends AbstractController
{
    /*
    * Request example:
    * {
    * "username":"AlexSmecherul",
    * "password":"alexESmecher1!A",
    * "amount" : "50"
    * }
    */

    #[Route('/v1/spin', name: 'app_roulette', methods:['POST'])]
    public function returnRoulette(){
        $response = new Response();

        $response->setContent(json_encode([
            "number" => (new RouletteService())->getNumber()
        ]));

        return $response;
    }
}
