import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgbCarouselConfig, NgbPaginationNext} from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from './shared/article.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavigationArrows = false;

  constructor(config: NgbCarouselConfig, private articleService: ArticleService, private router: Router){
    config.showNavigationArrows = false;
  }

  ngOnInit(){

  }
}
