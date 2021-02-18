<?php

namespace App\Entity;

use App\Entity\Article;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity("email")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\Email
     * 
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     */
    private $password;

        /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="user")
     */
    private $comments;

    /**
     * @ORM\ManyToMany(targetEntity=Article::class, mappedBy="users")
     */
    private $articles;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $pseudo;



    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->articles = new ArrayCollection();
       
    }
    // Getters----------------------------------------------------------------------------------------
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return (string) $this->email;
    }

    public function getUsername(): ?string
    {
        return $this->email;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    // Setters-------------------------------------------------------------------------------------------------------------
    public function setEmail(string $email): self {
        
        $this->email = $email;

        return $this;
    }

    public function setUserName(string $email): self {
        
        $this->email = $email;

        return $this;
    }
    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function setPseudo(string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    //Mapping with other classes--------------------------------------------------------------------------------------------------

    /**
     * @return Collection|comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Article[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->addUser($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->contains($article)) {
            $this->articles->removeElement($article);
            $article->removeUser($this);
        }

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }



   

    
}
