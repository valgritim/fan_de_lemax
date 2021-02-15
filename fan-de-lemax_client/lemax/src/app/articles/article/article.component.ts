import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from 'src/app/shared/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() myArticle : Article;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {

  }

  onSelected(){
    //je passe par un service pour dire l'article sélectionné que je récupère dans le article detail
    this.articleService.setArticleSelected(this.myArticle);

 }



}
