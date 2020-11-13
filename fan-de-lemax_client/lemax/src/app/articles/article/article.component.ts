import { Component, Input, OnInit } from '@angular/core';
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
  category: string;
  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    this.checkCategory(this.myArticle.category);
    // console.log(this.myArticle);
  }

  onSelected(){
    this.articleService.articleSelected.emit(this.myArticle);
    console.log(this.myArticle);
  }

  checkCategory(cat: number){
    switch(cat){
      case 1: return this.category = "lighted-buildings";
      case 2: return this.category = "facades";
      case 3: return this.category = "figurines";
      case 4: return this.category = "accessories";
      default: return this.category = "animations";
    }
  }

}
