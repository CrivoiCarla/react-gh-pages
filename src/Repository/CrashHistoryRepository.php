<?php

namespace App\Repository;

use App\Entity\CrashHistory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CrashHistory>
 *
 * @method CrashHistory|null find($id, $lockMode = null, $lockVersion = null)
 * @method CrashHistory|null findOneBy(array $criteria, array $orderBy = null)
 * @method CrashHistory[]    findAll()
 * @method CrashHistory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CrashHistoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CrashHistory::class);
    }

    public function save(CrashHistory $entity): void
    {
        $this->getEntityManager()->persist($entity);
            $this->getEntityManager()->flush();

    }

    public function remove(CrashHistory $entity): void
    {
        $this->getEntityManager()->remove($entity);
            $this->getEntityManager()->flush();
    }

//    /**
//     * @return CrashHistory[] Returns an array of CrashHistory objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CrashHistory
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
