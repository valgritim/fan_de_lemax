import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestsService } from 'src/app/requests.service';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from 'src/app/shared/article.service';
import { faArrowLeft, faOtter } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  selectedArticle: Article;
  sku: number;
  results: any[] = [];
  image: string = "assets/images/cadeau.jpg";

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private spinnerService: NgxSpinnerService, private requestsService : RequestsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.selectedArticle = this.articleService.articleSelected;


      console.log("dans article detail" + this.selectedArticle);//Undefined quand vient de article search
 // this.articles = this.articleService.getArticlesByCategory(this.id);

    this.route.params.subscribe(
      (params: Params) => {
        this.sku = +params['sku'];

        this.requestsService.getPricesFromShops(this.sku)
        .subscribe(prices => {
          this.results = prices as string[];
          this.spinnerService.hide();
          this.modalService.dismissAll();
        });

      }
    );

  }

  goBack(){
    window.history.go(-1);
    return false;
  }

}
