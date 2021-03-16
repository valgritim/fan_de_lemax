import {RequestsService} from './requests.service';
import {AuthService} from './auth/auth.service';
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
import { MagnifierService } from './shared/magnifier.service';
import { ArticleDetailComponent } from './articles/article/article-detail/article-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RetiredComponent } from './retired/retired.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleSearchComponent } from './articles/article/article-search/article-search.component';
import { AuthComponent} from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LittleSpinnerComponent } from './shared/little-spinner/little-spinner.component';
import { DashboardHeaderComponent } from './shared/dashboard-header/dashboard-header.component';
import { UserArticlesComponent } from './dashboard/user-articles/user-articles.component';
import { FirstToUpperPipe } from './shared/custom-pipes/first-to-upper.pipe';
import { AuthInterceptor } from './shared/auth.interceptor';





@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    ArticleComponent,
    HeaderComponent,
    HomeComponent,
    ArticleDetailComponent,
    CategoriesComponent,
    NotFoundComponent,
    RetiredComponent,
    ScrollToTopComponent,
    ArticleSearchComponent,
    AuthComponent,
    DashboardComponent,
    LittleSpinnerComponent,
    DashboardHeaderComponent,
    UserArticlesComponent,
    FirstToUpperPipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [ArticleService, RequestsService, AuthService, MagnifierService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
