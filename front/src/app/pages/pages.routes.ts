import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventorComponent } from './inventor/inventor.component';
import { PaisComponent } from './pais/pais.component';
import { QueryComponent } from './query/query.component';
import { QuestionComponent } from './question/question.component';
import { ResponceComponent } from './responce/responce.component';
import { TablesComponent } from './tables/tables.component';


export const page_routes: Routes = [
    //{ path: 'admin', component: AdminnComponent },
    { path: 'home', component: DashboardComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'query', component: QueryComponent },
    { path: 'country', component: PaisComponent },
    { path: 'question', component: QuestionComponent },
    { path: 'responce', component: ResponceComponent },
    { path: 'inventos', component: InventorComponent },
    
    {path: '**', pathMatch: 'full', redirectTo: 'admin'}
  ];
