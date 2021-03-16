import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgbCarouselConfig, NgbPaginationNext} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth/auth.service';
import { ArticleService } from './shared/article.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @HostListener("window:beforeunload",["$event"])
  clearLocalStorage(event){
      localStorage.clear();
  }

  @HostListener("window: onload", ["$event"])
  keepLocalSorage(event){
    localStorage.setItem("id", this.authService.getUser().key(0));
    localStorage.setItem("username", this.authService.getUser().key(1));
    localStorage.setItem("pseudo", this.authService.getUser().key(2));
    localStorage.setItem("token", this.authService.getUser().key(3));
  }

  showNavigationArrows = false;

  constructor(config: NgbCarouselConfig, private articleService: ArticleService, private router: Router, private authService: AuthService){
    config.showNavigationArrows = false;
  }

  ngOnInit(){
    this.authService.getUser();
  }
}
