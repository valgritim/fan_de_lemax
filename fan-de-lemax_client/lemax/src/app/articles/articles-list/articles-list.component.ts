import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestsService } from 'src/app/requests.service';
import { ArticleService } from 'src/app/shared/article.service';
import { CategoryService } from 'src/app/shared/category.service';
import { Article } from '../../shared/article.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']


})
export class ArticlesListComponent implements OnInit {
  articles: Article[];
  id : number;
  articlesOfOneCategory: Article[]= [];
  page: number = 1;
  totalRecords: number;

  constructor(private route: ActivatedRoute, private articleService : ArticleService, private requestsService : RequestsService, private spinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    // this.getCategoryById(1);
      this.spinnerService.show();
      this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];

          // this.articles = this.articleService.getArticlesByCategory(this.id);
          this.requestsService.fetchArticlesByCategory(this.id)
          .subscribe(categories => {
            this.articlesOfOneCategory = categories;
            this.totalRecords = categories.length;
            this.spinnerService.hide();
          });

        }
      );


    console.log("dans la liste " + this.id);

  }
  // getCategoryById(categoryId: number){
  //   this.requestsService.fetchArticlesByCategory(categoryId)
  //     .subscribe(categories => {
  //       this.articlesOfOneCategory = categories;
  //     console.log(this.articlesOfOneCategory)});
  // }
}
