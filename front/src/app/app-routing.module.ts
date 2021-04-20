import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { page_routes } from './pages/pages.routes';
import { LoginComponent } from './sesion/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: PagesComponent, children: page_routes },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
