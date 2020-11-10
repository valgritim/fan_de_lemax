<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    private UserPasswordEncoderInterface $userPasswordEncoder;

    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    /**
     * Undocumented function
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager) 
    {
        for ($i = 0; $i < 10 ; $i++){
            $user = new User();
            $user->setPassword($this->userPasswordEncoder->encodePassword($user, "password"));
            $user->setUsername(sprintf("email%d@gmail.com", $i));
            $user->setName(sprintf("name%d", $i));
            $manager->persist($user);           
        }       
        $manager->flush();
    }
}
