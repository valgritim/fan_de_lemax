import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { RequestsService } from 'src/app/requests.service';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from 'src/app/shared/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() myArticle : Article;
  @Input() currentpage: number;
  logginState: boolean;
  @Input() isInUserAccount: boolean;
  articleId : number;
  userId : number;
  message : any;
  error: string;
  successMessage : string = "";
  show: boolean = false;
  buttonShow: boolean = true;
  isPresent: boolean = false;


  constructor(private articleService: ArticleService, private authService: AuthService, private requestsService : RequestsService) { }

  ngOnInit(): void {
    this.authService.getLogginStateValue().subscribe(value => {
      this.logginState = value;
      // console.log(this.currentpage);
    });

    if(localStorage.getItem("id")){

      this.articleService.checkIfArticleIsOwned(this.myArticle.id)
          .subscribe(value => {
            this.isPresent = value;
            // console.log("dans article init check" + this.isPresent);
          })
    }
  }

  onSelected(){
    //je passe par un service pour dire l'article sélectionné que je récupère dans le article detail
    this.articleService.setArticleSelected(this.myArticle);

 }
 onAddToMyCollection($event){
    ($event.target as HTMLButtonElement).remove;
    this.articleId = parseInt(this.myArticle.id);

    this.userId = parseInt(localStorage.getItem('id'));

    this.requestsService.addArticleByUser(this.userId, this.articleId)
    .subscribe(result => {
      this.message = result
    }, errorMessage => {
      this.error = errorMessage;
    });

    this.articleService.addOneArticleByUser(this.myArticle);
    this.articleService.addOneToNrOfArticlesByCategory(this.myArticle.categoryId);
    this.successMessage = "Article ajouté à votre collection !";
    this.show = true;
    this.buttonShow = false;
 }

 onDeleteArticle(){

  this.articleId = parseInt(this.myArticle.id);
  this.userId = parseInt(localStorage.getItem('id'));

  this.requestsService.removeArticleByUser(this.userId, this.articleId)
    .subscribe(result => {
      this.message = result
    }, errorMessage => {
      this.error = errorMessage;
    });

    this.articleService.removeOneArticleByUser(this.myArticle.sku);
    this.articleService.removeOneToNrOfArticlesByCategory(this.myArticle.categoryId);
    document.getElementById(this.myArticle.id).style.display = "none";
 }
}
