<?php

namespace App\Repository;

use App\Entity\SpinnerHistory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SpinnerHistory>
 *
 * @method SpinnerHistory|null find($id, $lockMode = null, $lockVersion = null)
 * @method SpinnerHistory|null findOneBy(array $criteria, array $orderBy = null)
 * @method SpinnerHistory[]    findAll()
 * @method SpinnerHistory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SpinnerHistoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SpinnerHistory::class);
    }

    public function save(SpinnerHistory $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);
        $this->getEntityManager()->flush();
    }

    public function remove(SpinnerHistory $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);
        $this->getEntityManager()->flush();
    }

//    /**
//     * @return SpinnerHistory[] Returns an array of SpinnerHistory objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?SpinnerHistory
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
