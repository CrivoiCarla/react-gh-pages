<?php

namespace App\Controller;

use App\Service\SpinnerService;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Util\Json;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SpinnerController extends AbstractController
{
    /*
     * Request example
     * {
     * "id":10,
     * "game_id":1
     * "suma":10
     * }
     *
     */
    #[Route('/v1/addParticipant', name: 'app_add_participant')]
    public function addParticipant(Request $request, ManagerRegistry $managerRegistry): Response
    {
        $info = json_decode($request->getContent(),true);

        (new SpinnerService())->addParticipant($managerRegistry,$info);

        return new JsonResponse([
            "succes" => true
        ]);
    }
    /*
     * No response given
     */



    /*
     * This endpoint only requires the id of the game
     */
    #[Route('/v1/seeParticipants/{id}', name: 'app_see_participants')]
    public function seeParticipants(ManagerRegistry $managerRegistry, Request $request): Response
    {
        $game_id = $request->get("id");

        $response = (new SpinnerService())->getParticipants($managerRegistry,$game_id);

        return new JsonResponse([
            "participants" => $response
        ]);
    }
    /*
     * Response example
     * {
     * "participants" : [{"name":"X","photo":"https://facebook.com","suma":12},{"name":"Y","photo":"https://facebook.com","suma":13}]
     * }
     */


    /*
     * This endpoint only requires the id of the game
     */
    #[Route('/v1/chooseWinner/{id}', name: 'app_choose_winner')]
    public function chooseWinner(ManagerRegistry $registry, Request $request): Response
    {
        $game_id = $request->get("id");
        $response = (new SpinnerService())->getWinner($registry,$game_id);
        return new JsonResponse($response);
    }
    /*
     * Response example
     * {
     * "name" : "X",
     * "photo": "https://facebook.com"
     * }
     */


    /*
     * No request body necessarry
     */
    #[Route('/v1/getID', name: 'app_get_id')]
    public function getID(ManagerRegistry $registry): Response
    {
        $game_id = (new SpinnerService())->checkGame($registry);
        return new JsonResponse([
            "id" => $game_id
        ]);
    }
    /*
     * Response example
     * {
     * "id":123
     * }
     */
}
