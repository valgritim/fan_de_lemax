import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-little-spinner',
  template: '<div class="lds-ring text-center"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./little-spinner.component.css']
})
export class LittleSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
