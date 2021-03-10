import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestsService } from 'src/app/requests.service';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from 'src/app/shared/article.service';
import { faArrowLeft, faOtter, faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faStar = faStar;
  selectedArticle: Article;
  sku: number;
  results: any[] = [];
  image: string = "assets/images/cadeau.jpg";


  constructor(private articleService: ArticleService, private route: ActivatedRoute, private spinnerService: NgxSpinnerService, private requestsService : RequestsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.selectedArticle = this.articleService.articleSelected;


      console.log("dans article detail" + this.selectedArticle);//Undefined quand vient de article search
 // this.articles = this.articleService.getArticlesByCategory(this.id);

    this.route.params.subscribe(
      (params: Params) => {
        this.sku = +params['sku'];

        this.requestsService.getPricesFromShops(this.sku)
        .subscribe(prices => {
          this.results = prices as string[];
          this.spinnerService.hide();
          this.modalService.dismissAll();
          this.magnify("myimage", 2);
        });

      }
    );

  }

  goBack(){
    window.history.go(-1);
    return false;
  }

  magnify(imgID: string, zoom: number) {

    var img, glass, w, h, bw;
    img = document.getElementById("myimage");
    console.log(img);
    /*create magnifier glass:*/
    glass = document.createElement("div");
    glass.setAttribute("class", "img-magnifier-glass");
    console.log(glass);
    /*insert magnifier glass:*/
    img.parentElement.insertBefore(glass, img);
    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize =
      img.width * zoom + "px" + " " + img.height * zoom + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > img.width - w / zoom) {
        x = img.width - w / zoom;
      }
      if (x < w / zoom) {
        x = w / zoom;
      }
      if (y > img.height - h / zoom) {
        y = img.height - h / zoom;
      }
      if (y < h / zoom) {
        y = h / zoom;
      }
      /*set the position of the magnifier glass:*/
      glass.style.left = x - w + "px";
      glass.style.top = y - h + "px";
      /*display what the magnifier glass "sees":*/
      glass.style.backgroundPosition =
        "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
    }

    function getCursorPos(e) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

}
