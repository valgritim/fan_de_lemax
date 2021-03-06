import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ArticlesListComponent } from './articles/articles-list/articles-list.component';
import { ArticleDetailComponent } from './articles/article/article-detail/article-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RetiredComponent } from './retired/retired.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UserArticlesComponent } from './dashboard/user-articles/user-articles.component';


const routes: Routes = [

  { path: '', redirectTo: 'category', pathMatch:'full'},
  { path: 'category', component: HomeComponent,
      children: [
        { path: '', component: CategoriesComponent},
        { path: ':id', component: ArticlesListComponent},
        { path: ':id/:sku', component: ArticleDetailComponent}
      ]
  },
  { path: 'articles/retired', component: RetiredComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'dashboard',canActivate: [AuthGuard],component: DashboardComponent,
      children: [
        { path: ':id', component:UserArticlesComponent},
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
