import { EventEmitter, Injectable } from '@angular/core';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articleSelected = new EventEmitter<Article>();

  private articles : Article[] = [
    new Article("Normandy Cottage", 65089, "2016", "2020", "https://lemax.imgix.net/images/products/65089.jpg?h=350", 1),
    new Article("St. Margaret’s Church", 65083, "2016", null, "https://lemax.imgix.net/images/products/65083.jpg?h=350",1),
    new Article("A Cut Above Jewelers", 75236, "2017", null, "https://lemax.imgix.net/images/products/75236.jpg?h=350", 1)

  ];

  constructor() { }

  getArticles() {
    return this.articles;
  }


}
