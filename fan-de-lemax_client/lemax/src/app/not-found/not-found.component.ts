import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
   var hideMe = document.getElementById("bg-red");
    hideMe.style.display = "none";
    var navbar = document.getElementById("nv");
    navbar.style.visibility = "hidden";

  }

  onReturnToHome(){
    var hideMe = document.getElementById("bg-red");
    hideMe.style.display = "block";
    var navbar = document.getElementById("nv");
    navbar.style.visibility = "visible";
    this.router.navigateByUrl('');
  }
}
