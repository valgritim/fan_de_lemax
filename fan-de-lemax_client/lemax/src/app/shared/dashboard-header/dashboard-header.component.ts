import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { faHome, faBuilding, faTree, faSkating, faHeart, faComments, faBell, faAward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  faHome = faHome;
  faBuilding = faBuilding;
  faTree = faTree;
  faSkating = faSkating;
  faHeart = faHeart;
  faComments = faComments;
  faBell = faBell;
  faAward =faAward;
  pseudoUser : string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.pseudoUser = localStorage.getItem('pseudo');
    
  }

}
