import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, combineLatest, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { RequestsService } from 'src/app/requests.service';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbModalConfig, NgbModal]

})
export class HeaderComponent implements OnInit {
  faHome = faHome;
  researchItem: string = "";
  datas: Observable<Article[]>;
  results : Article[] = [];
  page: number = 1;
  totalRecords: number;
  filter: FormControl;
  filters: Observable<string>;
  filteredResults: Observable<Article[]>;

  constructor(private articleService: ArticleService, private config: NgbModalConfig, private modalService: NgbModal, private requestService: RequestsService, private spinnerService: NgxSpinnerService) {
    config.backdrop = 'static';
    config.keyboard = false;

  }

  ngOnInit(): void {

  }
  onSubmit(content){
    // console.log(this.researchItem);
    // this.articleService.setSearchedItem(this.researchItem);
    // this.articleService.getSearchedItem();
    this.modalService.open(content);
    this.spinnerService.show();
    this.datas = this.requestService.getAllArticles();
    this.filter = new FormControl('');
    this.filters = this.filter.valueChanges.pipe(startWith(''));

    this.filteredResults = combineLatest([this.datas, this.filters]).pipe(
      map(([datas, filterstring])=> datas.filter(result =>
        result.name.toLowerCase().startsWith(filterstring.toLowerCase())))
    );
    this.spinnerService.hide();
  }




}
