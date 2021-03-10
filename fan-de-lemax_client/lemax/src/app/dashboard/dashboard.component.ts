import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { faHome, faBuilding, faTree, faSkating, faHeart, faComments } from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faHome = faHome;
  faBuilding = faBuilding;
  faTree = faTree;
  faSkating = faSkating;
  faHeart = faHeart;
  faComments = faComments;
  pseudoUser : string;
  resultArray: [] = [];


  constructor(private authService: AuthService, private articleService: ArticleService) { }

  ngOnInit(): void {

    this.pseudoUser = localStorage.getItem('pseudo');

    this.articleService.getUserArrayOfCategories().subscribe((result: [] )=> {
       this.resultArray = result;
    });
  }


}
