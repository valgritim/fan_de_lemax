import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from 'src/app/shared/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() myArticle : Article;

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {

  }

  onSelected(){
    this.articleService.setArticleSelected(this.myArticle);
    console.log(this.myArticle);
  }



}
