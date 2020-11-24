import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from './shared/article.model';
import { catchError, map} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from './shared/message.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private articleUrl= 'https://localhost:8000/api/articles/';
  private crawlingPricesUrl = 'https://localhost:8000/api/crawling/';
  articleArray: Article[] = [];

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`requestsService: ${message}`);
  }

  /**
   * Http request to retrieve articles by category Id
   * @param categoryId
   */
  fetchArticlesByCategory(categoryId: number): Observable<Article[]>{
      return this.http.get<Article[]>(this.articleUrl+categoryId)
          .pipe(
            catchError(err => {throw 'error in fetchArticlesByCategory' + err})
          );

  }

  /**
   * Http request to retrieve articles by sku
   * @param slu
   */
  searchArticlePricesBySku(slu: number){

  }

  /**
   * Http request to retrieve all retired articles
   */
  fetchRetiredArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.articleUrl+"retired")
      .pipe(
        catchError(err => {throw 'error in fetch retired articles ' + err})
      );
  }
}
