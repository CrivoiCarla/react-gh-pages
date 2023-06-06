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
    public ManagerRegistry $registry;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AccountProfile::class);
        $this->registry = $registry;
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

    public function getAccountDetails($id){
        $em = $this->getEntityManager();
        return $em->getRepository(AccountProfile::class)->findOneBy(["player_id"=>$id]);
    }

    public function addAccountProfile(array $account_fields,$player_id){
        $new_account_profile = new AccountProfile();
        $new_account_profile->setMoney(0)
            ->setPhoto($account_fields["account_photo"])
            ->setAge($account_fields["age"])
            ->setName($account_fields["name"])
            ->setPlayerId($player_id);
        $this->save($new_account_profile);
    }

    public function findLastRecord()
    {
        $qb = $this->registry->getManager()->createQueryBuilder();
        $qb->select('e')
            ->from(AccountProfile::class, 'e')
            ->orderBy('e.id', 'DESC')
            ->setMaxResults(1);

        return $qb->getQuery()->getOneOrNullResult();
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
