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
    /*
    * Request example:
    * {
    * "id":10
    * }
    */

    #[Route('/v1/spin', name: 'app_roulette', methods:['POST'])]
    public function returnRoulette(Request $request, ManagerRegistry $registry){
        $info = json_decode($request->getContent(), true);

        $response = new Response();

        $response->setContent(json_encode([
            "number" => (new RouletteService())->getNumber($info["id"],$registry)
        ]));

        return $response;
    }
}
