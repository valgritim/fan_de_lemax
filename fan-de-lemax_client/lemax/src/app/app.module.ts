import {RequestsService} from './requests.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ArticlesListComponent } from './articles/articles-list/articles-list.component';
import { ArticleComponent } from './articles/article/article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ArticleService } from './shared/article.service';
import { ArticleDetailComponent } from './articles/article/article-detail/article-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    ArticleComponent,
    HeaderComponent,
    HomeComponent,
    ArticleDetailComponent,
    CategoriesComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule

  ],
  providers: [ArticleService, RequestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
