import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Article } from './article.model';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articleSelected: Article ;
  articlesByCategory: Article [] = [];
  searchedItem: string = "";


  private articles : Article[] = [
    new Article("Normandy Cottage", 65089, "2016", "2020", "https://lemax.imgix.net/images/products/65089.jpg?h=350", 1),
    new Article("St. Margaret’s Church", 65083, "2016", null, "https://lemax.imgix.net/images/products/65083.jpg?h=350",1),
    new Article("A Cut Above Jewelers", 75236, "2017", null, "https://lemax.imgix.net/images/products/75236.jpg?h=350", 1),
    new Article("Normandybis", 65089, "2016", "2020", "https://lemax.imgix.net/images/products/65089.jpg?h=350", 2),
    new Article("St. Margaret’s bis", 65083, "2016", null, "https://lemax.imgix.net/images/products/65083.jpg?h=350",2),
    new Article("A Cut Above bis", 75236, "2017", null, "https://lemax.imgix.net/images/products/75236.jpg?h=350", 2),

  ];

  constructor() { }

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

  // setArticleSelected(article: Article){
  //   this.articleSelected = article;
  //   console.log("dans mon service" + this.articleSelected);
  // }

  setArticleSelected(article : Article){
    this.articleSelected = article;
  }

  getArticleSelected(){
    return this.articleSelected;
  }

  // getSearchedItem(){
  //   // console.log(this.searchedItem);
  //   this.searchChanged.next(this.searchedItem);

  // }

  // setSearchedItem(item: string){
  //   this.searchedItem = item;
  // }
}
