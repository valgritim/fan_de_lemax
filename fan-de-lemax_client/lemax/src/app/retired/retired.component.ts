import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestsService } from '../requests.service';
import { Article } from '../shared/article.model';

@Component({
  selector: 'app-retired',
  templateUrl: './retired.component.html',
  styleUrls: ['./retired.component.css']
})
export class RetiredComponent implements OnInit {
  retiredArticles : Article[] = [];
  page: number = 1;
  totalRecords: number;

  constructor(private route: ActivatedRoute, private spinnerService : NgxSpinnerService, private requestsService : RequestsService) { }

  ngOnInit(): void {
    this.spinnerService.show();
         this.requestsService.fetchRetiredArticles()
            .subscribe(articles => {
              this.retiredArticles = articles;
              // console.log(this.retiredArticles)
              this.spinnerService.hide();
            });

    }

}
