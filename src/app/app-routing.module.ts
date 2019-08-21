import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './admin-layout/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CandidatesComponent } from './admin-layout/candidates/candidates.component';
import { QuestionComponent } from './admin-layout/question/question.component';

const routes: Routes = [
  {path: 'admin', component: AdminLayoutComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full',},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'candidates', component: CandidatesComponent},
    {path: 'question', component: QuestionComponent}
  ]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
