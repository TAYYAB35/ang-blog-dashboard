import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path : 'category' , component: CategoryComponent},
  {path : 'posts' , component: AllPostComponent},
  {path : 'login' , component: LoginComponent},
  {path : 'posts/new' , component: NewPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
