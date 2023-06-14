<?php

namespace App\Repository;

use App\Entity\Account;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Account>
 *
 * @method Account|null find($id, $lockMode = null, $lockVersion = null)
 * @method Account|null findOneBy(array $criteria, array $orderBy = null)
 * @method Account[]    findAll()
 * @method Account[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AccountRepository extends ServiceEntityRepository
{
    public ManagerRegistry $registry;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Account::class);
        $this->registry = $registry;
    }

    public function save(Account $entity): void
    {
        $this->getEntityManager()->persist($entity);
        $this->getEntityManager()->flush();
    }

    public function remove(Account $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);
        $this->getEntityManager()->flush();
    }

    public function checkExistence(array $account_info){
        $em = $this->getEntityManager();
        return $em->getRepository(Account::class)->findOneBy(["name"=>$account_info["name"],"surname"=>$account_info["surname"],"mail"=>$account_info["email"]]);
    }

    public function addAccount(array $account_info){
        $em = $this->getEntityManager();
        $account = new Account();

        $account->setUsername($account_info["username"])
            ->setPassword($account_info["password"])
            ->setPhoneNumber($account_info["phone_number"])
            ->setName($account_info["name"])
            ->setSurname($account_info["surname"])
            ->setAge($account_info["age"])
            ->setMail($account_info["email"]);

        $em -> persist($account);
        $em -> flush();
    }

    public function loginAccount(array $account_info){
        $em = $this->getEntityManager();

        return $em->getRepository(Account::class)->findOneBy(["mail"=>$account_info["email"],"password"=>$account_info["password"]]);
    }

    public function changePass(array $account_info){
        $em = $this->getEntityManager();
        $account = $em->getRepository(Account::class)->findOneBy(["id"=>$account_info["id"]]);
        $account->setPassword($account_info["password"]);
        $em->persist($account);
        $em->flush();
        return 1;
}
    public function findLastRecord()
    {
        $qb = $this->registry->getManager()->createQueryBuilder();
        $qb->select('e')
            ->from(Account::class, 'e')
            ->orderBy('e.id', 'DESC')
            ->setMaxResults(1);

        return $qb->getQuery()->getOneOrNullResult();
    }

//    /**
//     * @return Account[] Returns an array of Account objects
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

//    public function findOneBySomeField($value): ?Account
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
