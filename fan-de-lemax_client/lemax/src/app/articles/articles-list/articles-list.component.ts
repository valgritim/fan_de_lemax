import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestsService } from 'src/app/requests.service';
import { ArticleService } from 'src/app/shared/article.service';
import { Article } from '../../shared/article.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']


})
export class ArticlesListComponent implements OnInit {
  articles: Article[];
  id : number;
  articlesOfOneCategory: Article[]= [];
  page: number = 1;
  totalRecords: number;

  constructor(private router: Router, private articleService: ArticleService, private route: ActivatedRoute, private requestsService : RequestsService, private spinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    // this.getCategoryById(1);
    // this.spinnerService.show();

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.spinnerService.show();

        // Go feetch articles by category API endpoint
        this.requestsService.fetchArticlesByCategory(this.id)
        .subscribe(categories => {
          this.articlesOfOneCategory = categories;
          this.totalRecords = categories.length;
          this.spinnerService.hide();
        });
      }
    );
  }

  onPageChange(){

    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();

  }
}
