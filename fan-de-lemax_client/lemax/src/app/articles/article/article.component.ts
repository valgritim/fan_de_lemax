import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from 'src/app/shared/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() myArticle : Article;
  logginState: boolean;

  constructor(private articleService: ArticleService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getLogginStateValue().subscribe(value => {
      this.logginState = value;
    })
  }

  onSelected(){
    //je passe par un service pour dire l'article sélectionné que je récupère dans le article detail
    this.articleService.setArticleSelected(this.myArticle);

 }
 onAddToMyCollection(){

 }


}
