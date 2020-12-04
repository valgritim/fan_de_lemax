import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../shared/article.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchedArticle: any;

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    // this.articleService.searchChanged
    // .subscribe(value => {
    //   this.searchedArticle = value;
    //   console.log("dans home component " + this.searchedArticle);
    //   this.articleService.setSearchedItem("");
    //   // this.router.navigate(["/search"]);
    // });
  }

}
