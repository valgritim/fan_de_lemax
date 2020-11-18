import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
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
  // selectedArticle: Article;
  // isArticleSelected = false;

  constructor(private route: ActivatedRoute, private articleService : ArticleService) {}

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.articles = this.articleService.getArticlesByCategory(this.id);
      }
    );
    console.log("dans la liste " + this.id);

  }

}
