<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ArticleRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ArticleRepository::class)
 */
class Article
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("article:read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"article:read", "category:read"})
     */
    private $name;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"article:read", "category:read"})
     */
    private $sku;

    /**
     * @ORM\Column(type="string", length=10)
     * @Groups({"article:read", "category:read"})
     */
    private $released;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     * @Groups({"article:read", "category:read"})
     */
    private $retired;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"article:read", "category:read"})
     */
    private $imagePath;

    /**
     * @ORM\Column(type="integer")
     * @Groups("article:read")
     */
    private $categoryId;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="article")
     * 
     */
    private $comment;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="articles")
     */
    private $users;


    public function __construct()
    {
        $this->comment = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSku(): ?int
    {
        return $this->sku;
    }

    public function setSku(?int $sku): self
    {
        $this->sku = $sku;

        return $this;
    }

    public function getReleased(): ?string
    {
        return $this->released;
    }

    public function setReleased(string $released): self
    {
        $this->released = $released;

        return $this;
    }

    public function getRetired(): ?string
    {
        return $this->retired;
    }

    public function setRetired(?string $retired): self
    {
        $this->retired = $retired;

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(string $imagePath): self
    {
        $this->imagePath = $imagePath;

        return $this;
    }

    public function getCategoryId(): ?category
    {
        return $this->category;
    }

    public function setCategoryId($categoryId): self
    {
        $this->categoryId = $categoryId;

        return $this;
    }

    /**
     * @return Collection|comment[]
     */
    public function getComment(): Collection
    {
        return $this->comment;
    }

    public function addComment(comment $comment): self
    {
        if (!$this->comment->contains($comment)) {
            $this->comment[] = $comment;
            $comment->setArticle($this);
        }

        return $this;
    }

    public function removeComment(comment $comment): self
    {
        if ($this->comment->contains($comment)) {
            $this->comment->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getArticle() === $this) {
                $comment->setArticle(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|user[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(user $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
        }

        return $this;
    }

    public function removeUser(user $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
        }

        return $this;
    }

}
