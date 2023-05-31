<?php

namespace App\Repository;

use App\Entity\Crash;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Crash>
 *
 * @method Crash|null find($id, $lockMode = null, $lockVersion = null)
 * @method Crash|null findOneBy(array $criteria, array $orderBy = null)
 * @method Crash[]    findAll()
 * @method Crash[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CrashRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Crash::class);
    }

    public function save(Crash $entity): void
    {
        $this->getEntityManager()->persist($entity);

        $this->getEntityManager()->flush();
    }

    public function remove(Crash $entity): void
    {
        $this->getEntityManager()->remove($entity);
            $this->getEntityManager()->flush();
    }
    public function findLastRecord(ManagerRegistry $registry)
    {
        $qb = $registry->getManager()->createQueryBuilder();
        $qb->select('e')
            ->from(Crash::class, 'e')
            ->orderBy('e.id', 'DESC')
            ->setMaxResults(1);

        return $qb->getQuery()->getOneOrNullResult();
    }

//    /**
//     * @return Crash[] Returns an array of Crash objects
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

//    public function findOneBySomeField($value): ?Crash
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
