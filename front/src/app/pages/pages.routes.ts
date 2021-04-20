import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablesComponent } from './tables/tables.component';


export const page_routes: Routes = [
    //{ path: 'admin', component: AdminnComponent },
    { path: 'home', component: DashboardComponent },
    { path: 'tables', component: TablesComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'admin'}
  ];
