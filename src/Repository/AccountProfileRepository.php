<?php

namespace App\Repository;

use App\Entity\AccountProfile;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AccountProfile>
 *
 * @method AccountProfile|null find($id, $lockMode = null, $lockVersion = null)
 * @method AccountProfile|null findOneBy(array $criteria, array $orderBy = null)
 * @method AccountProfile[]    findAll()
 * @method AccountProfile[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AccountProfileRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AccountProfile::class);
    }

    public function save(AccountProfile $entity): void
    {
        $this->getEntityManager()->persist($entity);
        $this->getEntityManager()->flush();
    }

    public function remove(AccountProfile $entity): void
    {
        $this->getEntityManager()->remove($entity);
        $this->getEntityManager()->flush();
    }

    public function removeMoney(int $id, float $suma){
        $accountProfile = $this->findOneBy(["player_id"=>$id]);
        if($accountProfile->getMoney() - $suma < 0){
            die();
        }
        $accountProfile->setMoney($accountProfile->getMoney() - $suma);
        $this->save($accountProfile);
        return $accountProfile;
    }

    public function addMoney(int $id, float $suma){
        $accountProfile = $this->findOneBy(["player_id"=>$id]);
        $accountProfile->setMoney($accountProfile->getMoney() + $suma);
        $this->save($accountProfile);
        return $accountProfile;
    }

    public function setMoney(array $account_info){
        $em = $this->getEntityManager();
        $accountProfile = $em->getRepository(AccountProfile::class)->findOneBy(["player_id"=>$account_info["id"]]);
        $accountProfile->setMoney($accountProfile->getMoney() + $account_info["money"]);
        $em->persist($accountProfile);
        $em->flush();
    }

//    /**
//     * @return AccountProfile[] Returns an array of AccountProfile objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?AccountProfile
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
