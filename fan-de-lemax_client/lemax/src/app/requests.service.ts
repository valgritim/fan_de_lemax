import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Article } from './shared/article.model';
import { catchError, map} from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './shared/message.service';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private articleUrl= 'https://localhost:8000/api/articles/';
  private crawlingPricesUrl = 'https://localhost:8000/api/crawling/';
  private userUrl = 'https://localhost:8000/api/user/';
  articleArray: Article[] = [];

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',

    })
  };

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
   * Http request to retrieve all retired articles
   */
  fetchRetiredArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.articleUrl+"retired")
      .pipe(
        catchError(err => {throw 'error in fetch retired articles ' + err})
      );
  }
  /**
   * Http request to retrieve articles by sku
   * @param sku
   */
  getPricesFromShops(sku: number){
    return this.http.get(this.crawlingPricesUrl+sku)
      .pipe(
        catchError(err => { throw 'error in get prices from shops ' + err})
      );
  }

  getAllArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.articleUrl)
      .pipe(
        catchError(err => { throw 'error in getting all the articles ' + err})
      );
  }

  fetchArticlesByUser(userId: number){
    return this.http.get<Article[]>(`${this.userUrl + userId}`, this.httpOptions)
    .pipe(
      catchError(err => {throw 'error in fetchArticlesByUser' + err})
    );
  }

  addArticleByUser(userId: number, articleId: number){

    return this.http.put(this.userUrl + userId, {
      id: articleId,
    }, this.httpOptions)
    .pipe(
      catchError(errorResp => {
        let errorMessage = `probleme dans envoyer un article ${errorResp}`;
        console.log(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
