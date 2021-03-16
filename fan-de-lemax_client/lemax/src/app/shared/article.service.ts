import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from './article.model';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articleSelected: Article ;
  articlesByCategory: Article [] = [];
  searchedItem: string = "";
  articlesByUser : Article [] = [];
  nrOfCategory1: number = 0;
  nrOfCategory2: number = 0;
  nrOfCategory3: number = 0;
  nrOfCategory4: number = 0;
  nrOfCategory5: number = 0;
  nrOfCategory6: number = 0;
  private nrOfArticlesByCategoryArray= [];
  isPresent : boolean = false;


  private articles : Article[] = [
    new Article(null,"Normandy Cottage", 65089, "2016", "2020", "https://lemax.imgix.net/images/products/65089.jpg?h=350", 1),
    new Article(null,"St. Margaret’s Church", 65083, "2016", null, "https://lemax.imgix.net/images/products/65083.jpg?h=350",1),
    new Article(null,"A Cut Above Jewelers", 75236, "2017", null, "https://lemax.imgix.net/images/products/75236.jpg?h=350", 1),
    new Article(null,"Normandybis", 65089, "2016", "2020", "https://lemax.imgix.net/images/products/65089.jpg?h=350", 2),
    new Article(null,"St. Margaret’s bis", 65083, "2016", null, "https://lemax.imgix.net/images/products/65083.jpg?h=350",2),
    new Article(null,"A Cut Above bis", 75236, "2017", null, "https://lemax.imgix.net/images/products/75236.jpg?h=350", 2),

  ];

  constructor() { }

  //This part concerns article thumbnails in home page------------------------------------------
  getArticles() {
    return this.articles;
  }

  getArticlesByCategory(id: number){
    this.articlesByCategory = [];
    this.articles.forEach(article => {
      if(article.categoryId == id){
        console.log("article category " + article.categoryId);
        this.articlesByCategory.push(article);
      }
    });
    return this.articlesByCategory;
  }

  //This part concerns the article selected------------------------------------------------------
  setArticleSelected(article : Article){
    this.articleSelected = article;
  }

  getArticleSelected(){
    return this.articleSelected;
  }

  //This part concerns the user dashboard--------------------------------------------------

  /**
   * Set the articles of the user in an array after HTTP Request
   * @param articles
   * @void
   */
  setArticlesByUser(articles: Article[]){
    articles.forEach(article => {
      this.articlesByUser.push(article);
    });
  }

  /**
   *  return all the article for an user
   * @returns Article[]
   */
  getArticlesByUser(){
    return this.articlesByUser;
  }

  removeArticlesByUser(){
    this.articlesByUser = [];
  }

  /**
   * Fetch articles by category for one user
   * @param categoryId
   * @returns Article[]
   */
  getArticlesByUserAndByCategory(categoryId : number){
    this.articlesByCategory = [];
    this.articlesByUser.forEach(article => {
      if(article.categoryId == categoryId){
        console.log("article category " + article.categoryId);
        this.articlesByCategory.push(article);
      };
    });
    return this.articlesByCategory;
  }

  /**
   *  Add the selected article in articlesByUser Array
   * @param article
   */
  addOneArticleByUser(article : Article){
    if(article != null){
      this.articlesByUser.push(article);
    }
  }

  /**
   * Removes the selected article from articleUser array
   */
  removeOneArticleByUser(articleSku: number){
    if(articleSku != null){
      var index = this.articlesByUser.findIndex(function(element){
        return element.sku === articleSku;
      });
      if(index !== -1){
        this.articlesByUser.splice(index,1);
      }  else {
        throw new Error("impossible de supprimer l'article");
      }
  }
}

  /**
   * Count the articles by category to dispatch the result inside user-article.component
   * @returns array
   */
  countArticlesByUserAndByCategory(){
    // console.log(this.articlesByUser);
    this.articlesByUser.forEach(article => {
        switch(article.categoryId){
          case 1 : this.nrOfCategory1 = this.nrOfCategory1 + 1; break;
          case 2 : this.nrOfCategory2 = this.nrOfCategory2 + 1;break;
          case 3 : this.nrOfCategory3 = this.nrOfCategory3 + 1 ;break;
          case 4 : this.nrOfCategory4 = this.nrOfCategory4 + 1;break;
          case 5 : this.nrOfCategory5 = this.nrOfCategory5 + 1;break;
          case 6 : this.nrOfCategory6 = this.nrOfCategory6 + 1;break;
        }
    });
    this.nrOfArticlesByCategoryArray["house"] = this.nrOfCategory1;
    this.nrOfArticlesByCategoryArray["facade"] = this.nrOfCategory2;
    this.nrOfArticlesByCategoryArray["folk"] = this.nrOfCategory3;
    this.nrOfArticlesByCategoryArray["accessory"] = this.nrOfCategory4;
    this.nrOfArticlesByCategoryArray["animated"] = this.nrOfCategory5;
    this.nrOfArticlesByCategoryArray["retired"] = this.nrOfCategory6;

    // return this.nrOfArticlesByCategoryArray;
  }

  /**
   * Set an Observable on nrOfArticlesByCategoryArray
   * @returns Observable
   */
  getUserArrayOfCategories(){
    return of(this.nrOfArticlesByCategoryArray);
  }

  /**
   * Add 1 to articleCategory to counter when one article is added to user portfolio
   * @param categoryId
   */
  addOneToNrOfArticlesByCategory(categoryId : number){
    // console.log("1-categoryid ajouté " + categoryId);
    switch(categoryId){
      case 1 : this.nrOfArticlesByCategoryArray["house"] = this.nrOfArticlesByCategoryArray["house"] + 1;
      break;
      case 2 : this.nrOfArticlesByCategoryArray["facade"] = this.nrOfArticlesByCategoryArray["facade"] + 1;
      break;
      case 3 : this.nrOfArticlesByCategoryArray["folk"] = this.nrOfArticlesByCategoryArray["facade"] + 1;
      break;
      case 4 : this.nrOfArticlesByCategoryArray["accessory"] = this.nrOfArticlesByCategoryArray["accessory"] + 1;
      break;
      case 5 : this.nrOfArticlesByCategoryArray["animated"] = this.nrOfArticlesByCategoryArray["animated"] + 1;
      break;
      default : this.nrOfArticlesByCategoryArray["retired"] = this.nrOfArticlesByCategoryArray["retired"] + 1;
    }

    // console.log(this.nrOfArticlesByCategoryArray);

  }

  removeOneToNrOfArticlesByCategory(categoryId : number){
    // console.log("1-categoryid ajouté " + categoryId);
    switch(categoryId){
      case 1 : this.nrOfArticlesByCategoryArray["house"] = this.nrOfArticlesByCategoryArray["house"] - 1;
      break;
      case 2 : this.nrOfArticlesByCategoryArray["facade"] = this.nrOfArticlesByCategoryArray["facade"] - 1;
      break;
      case 3 : this.nrOfArticlesByCategoryArray["folk"] = this.nrOfArticlesByCategoryArray["facade"] - 1;
      break;
      case 4 : this.nrOfArticlesByCategoryArray["accessory"] = this.nrOfArticlesByCategoryArray["accessory"] - 1;
      break;
      case 5 : this.nrOfArticlesByCategoryArray["animated"] = this.nrOfArticlesByCategoryArray["animated"] - 1;
      break;
      default : this.nrOfArticlesByCategoryArray["retired"] = this.nrOfArticlesByCategoryArray["retired"] - 1;
    }

    // console.log(this.nrOfArticlesByCategoryArray);

  }

  /**
   * Reset array nr of articles by category when user logs out
   */
  resetArrayOfCategories(){
    this.nrOfArticlesByCategoryArray = [];
  }

  /**
   * Check if one article is already owned by User
   * @param articleId
   */
  checkIfArticleIsOwned(id: string){
      let totalArticles = this.getArticlesByUser();

      for(let i = 0 ; i < totalArticles.length; i++){
        if(totalArticles[i].id == id){
          // console.log("id de l'article " + this.articlesByUser[i].id + " " + id);
          this.isPresent = true;
          break;
        } else {
          this.isPresent = false;
        }
      }
      return of(this.isPresent);
  }


}
