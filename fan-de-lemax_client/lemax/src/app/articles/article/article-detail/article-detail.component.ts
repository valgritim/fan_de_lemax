import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from 'src/app/shared/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  selectedArticle: Article;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.articleSelected
      .subscribe(
        (article: Article) => {
          this.selectedArticle = article;
          console.log(this.selectedArticle);
        }
      );
  }

}
