import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from 'src/app/shared/article.service';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.css']
})
export class ArticleSearchComponent implements OnInit {
  @Input() myArticle : Article;
  selectedArticle: Article;


  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {

  }

  onSelected(){
    this.articleService.setArticleSelected(this.myArticle);

 }
}
