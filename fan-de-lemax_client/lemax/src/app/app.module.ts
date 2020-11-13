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


@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    ArticleComponent,
    HeaderComponent,
    HomeComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgbModule,
    FontAwesomeModule

  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
