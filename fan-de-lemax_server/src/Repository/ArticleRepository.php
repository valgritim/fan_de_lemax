<?php

namespace App\Repository;

use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Article|null find($id, $lockMode = null, $lockVersion = null)
 * @method Article|null findOneBy(array $criteria, array $orderBy = null)
 * @method Article[]    findAll()
 * @method Article[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleRepository extends ServiceEntityRepository
{
   

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Article::class);

    }

     /**
      * @return Article[] Returns an array of Article objects
      */
    
    public function findByName($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.name = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function findBySku($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.sku = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult()
        ;
    }
       
    public function findOneById($value): ?Article
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.id = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findRetiredArticles()
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.retired IS NOT NULL' )
            ->getQuery()
            ->getResult();
    }

    public function findArticlesByCategoryId($id){
        return $this->createQueryBuilder('a')
            ->andWhere('a.categoryId = :id')
            ->andWhere('a.retired is null')
            ->setParameter('id', $id)            
            ->getQuery()
            ->getResult();
    }

    public function findArticlesByUserIdAndCategoryId($userId, $categoryId){
         $dql = "SELECT a from Article JOIN a.users u WHERE u.id = $userId AND a.categoryId = $categoryId";
        return $this->createQueryBuilder($dql)
                    ->getQuery()
                    ->getResult();
    }
    
    
}
