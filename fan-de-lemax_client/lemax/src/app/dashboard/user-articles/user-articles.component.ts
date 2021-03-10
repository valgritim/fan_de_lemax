import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestsService } from 'src/app/requests.service';
import { ArticleService } from 'src/app/shared/article.service';
import { Article } from '../../shared/article.model';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.css']
})
export class UserArticlesComponent implements OnInit {
  articles: Article[];
  id : number;
  articlesOfOneCategory: Article[]= [];
  page: number = 1;
  totalRecords: number[];
  currentUser: number;

  constructor(private articleService:ArticleService ,private route: ActivatedRoute, private requestsService : RequestsService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {

    this.currentUser = parseInt(localStorage.getItem("id"));

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.spinnerService.show();
    //Retrieve userId in local storage but it is a string->convert to int
      this.currentUser = parseInt(localStorage.getItem('id'));
        // Fetch articles by user and pick articles by category - API endpoint
        if(this.articleService.getArticlesByUser().length == 0){
          console.log("1ere condition " + this.articleService.getArticlesByUser().length);
          this.requestsService.fetchArticlesByUser(this.currentUser)
              .subscribe(userArticles => {
              this.articleService.setArticlesByUser(userArticles);
              this.articlesOfOneCategory = this.articleService.getArticlesByUserAndByCategory(this.id);
              // console.log("premiere requete " + this.articlesOfOneCategory);
              this.articleService.countArticlesByUserAndByCategory();
              this.spinnerService.hide();
          });
        } else {
          this.requestsService.fetchArticlesByUser(this.currentUser)
            .subscribe(userArticles => {

            this.articlesOfOneCategory = this.articleService.getArticlesByUserAndByCategory(this.id);

            console.log("2e requete " + this.articlesOfOneCategory);
            console.log("deuxieme condition");
            // console.log("les articles sont deja présents " + this.articlesOfOneCategory);
            // this.totalRecords = this.articleService.countArticlesByUserAndByCategory();
            // console.log(this.totalRecords);
            this.spinnerService.hide();
          });
         // console.log("dans user articles pour la categorie " + this.id);
        }
    });
  }
}
