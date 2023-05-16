<?php

namespace App\Repository;

use App\Entity\SpinnerRecords;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SpinnerRecords>
 *
 * @method SpinnerRecords|null find($id, $lockMode = null, $lockVersion = null)
 * @method SpinnerRecords|null findOneBy(array $criteria, array $orderBy = null)
 * @method SpinnerRecords[]    findAll()
 * @method SpinnerRecords[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SpinnerRecordsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SpinnerRecords::class);
    }

    public function save(SpinnerRecords $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(SpinnerRecords $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return SpinnerRecords[] Returns an array of SpinnerRecords objects
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

//    public function findOneBySomeField($value): ?SpinnerRecords
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
