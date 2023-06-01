<?php

namespace App\Controller;

use App\Service\RouletteService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RouletteController extends AbstractController
{
    public RouletteService $roulette_service;
    public function __construct(ManagerRegistry $managerRegistry)
    {
        $this->roulette_service = new RouletteService($managerRegistry);
    }
    /*
    * Request example:
    * {
    * "id":10
    * }
    */
    #[Route('/v1/spin', name: 'app_roulette', methods:['POST'])]
    public function returnRoulette(Request $request){
        $info = json_decode($request->getContent(), true);

        $response = new Response();

        $response->setContent(json_encode([
            "number" => $this->roulette_service->getNumber($info["id"])
        ]));

        return $response;
    }
}
