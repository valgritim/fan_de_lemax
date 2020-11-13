import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/shared/article.service';
import { Article } from '../../shared/article.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']


})
export class ArticlesListComponent implements OnInit {
  category: string;
  articles: Article[];

  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.params['category'];
    this.articles = this.articleService.getArticles();

  }

}
