import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ArticlesListComponent } from './articles/articles-list/articles-list.component';
import { ArticleDetailComponent } from './articles/article/article-detail/article-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [

  { path: '', redirectTo: 'category', pathMatch:'full'},
  { path: 'category', component: HomeComponent,
      children: [
        { path: '', component: CategoriesComponent},
        { path: ':id', component: ArticlesListComponent},
        { path: ':id/:sku', component: ArticleDetailComponent}
      ]
  },
  { path: 'not-found', component: NotFoundComponent},
  { path:'**', redirectTo:'not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
