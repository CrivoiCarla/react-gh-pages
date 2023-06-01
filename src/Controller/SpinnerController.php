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
    public SpinnerService $spinner_service;
    public ManagerRegistry $managerRegistry;
    public function __construct(ManagerRegistry $managerRegistry)
    {
        $this->managerRegistry = $managerRegistry;
        $this->spinner_service = new SpinnerService($managerRegistry);
    }
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
    public function addParticipant(Request $request): Response
    {
        $info = json_decode($request->getContent(),true);

        $this->spinner_service->addParticipant($info);

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
    public function seeParticipants(Request $request): Response
    {
        $game_id = $request->get("id");

        $response = $this->spinner_service ->getParticipants($game_id);

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
    public function chooseWinner(Request $request): Response
    {
        $game_id = $request->get("id");
        $response = $this->spinner_service ->getWinner($game_id);
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
    public function getID(): Response
    {
        $game_id = $this->spinner_service->checkGame();
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
