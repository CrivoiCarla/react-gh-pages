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
    public ManagerRegistry $registry;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SpinnerRecords::class);
        $this->registry = $registry;
    }

    public function save(SpinnerRecords $entity)
    {
        $this->getEntityManager()->persist($entity);
        $this->getEntityManager()->flush();
        return $entity->getId();
    }

    public function remove(SpinnerRecords $entity): void
    {
        $this->getEntityManager()->remove($entity);
        $this->getEntityManager()->flush();
    }
    public function findLastRecord()
    {
        $qb = $this->registry->getManager()->createQueryBuilder();
        $qb->select('e')
            ->from(SpinnerRecords::class, 'e')
            ->orderBy('e.id', 'DESC')
            ->setMaxResults(1);

        return $qb->getQuery()->getOneOrNullResult();
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
