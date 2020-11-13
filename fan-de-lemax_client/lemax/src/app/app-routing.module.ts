import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ArticleDetailComponent } from './articles/article/article-detail/article-detail.component';
import { ArticlesListComponent } from './articles/articles-list/articles-list.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent},
  { path: 'articles/:category', component: ArticlesListComponent,
      children: [
        { path: ':articleName', component: ArticleDetailComponent}
      ]
  },
  { path: 'articles', component: ArticlesListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
