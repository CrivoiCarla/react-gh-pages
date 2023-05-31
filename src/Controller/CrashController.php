<?php
namespace App\Controller;
use App\Service\CrashService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CrashController extends AbstractController
{
    /*
     * No request body necessarry
     */
    #[Route('/v1/getMultiplierCrash', name: 'app_crash_multiplier', methods:['POST'])]
    public function getMultiplierCrash(Request $request, ManagerRegistry $registry){
        return new JsonResponse([
            "multiplier" => (new CrashService())->getMultiplier($registry)
        ]);
    }
    /*
     * Response body
     * {
     * "multiplier":1.12
     * }
     */

    /*
     * No request body necessary
     */
    #[Route('/v1/getCrashId', name: 'app_crash_id', methods:['POST'])]
    public function getCrashId(Request $request, ManagerRegistry $registry){
        return new JsonResponse([
            "id"=> (new CrashService())->getLastGame($registry)
        ]);
    }
    /*
     * Response body
     * {
     * "id":41
     * }
     */

    /*
     * Request body
     * {
     * "id_jucator" : 10,
     * "suma" : 50
     * }
     */
    #[Route('/v1/placeBet', name: 'app_crash_place_bet', methods:["POST"])]
    public function placeBet(Request $request, ManagerRegistry $registry){
        $info = json_decode($request->getContent(),true);

        (new CrashService())->placeBet($registry,$info);

        return new JsonResponse([
            "succes" => true
        ]);
    }
    /*
     * No relevant response, only giving succes : true always
     */

    /*
     * Request body
     * {
     * "id_jucator" : 10,
     * "multiplier" : 1.12
     */
    #[Route('/v1/cashout', name: 'app_crash_cashout', methods:['POST'])]
    public function cashout(Request $request, ManagerRegistry $registry){
$info = json_decode($request->getContent(),true);

        (new CrashService())->cashout($registry,$info);

        return new JsonResponse([
            "succes" => true
        ]);
    }
    /*
     * No relevant response, only giving succes : true always
     */

}