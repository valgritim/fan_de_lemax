import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { faHome, faBuilding, faTree, faSkating, faHeart, faComments } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
        this.pseudoUser = localStorage.getItem('pseudo');
  }

}
