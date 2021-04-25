import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QueryComponent } from './query/query.component';
import { TablesComponent } from './tables/tables.component';


export const page_routes: Routes = [
    //{ path: 'admin', component: AdminnComponent },
    { path: 'home', component: DashboardComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'query', component: QueryComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'admin'}
  ];
