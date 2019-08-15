import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../shared/search.pipe';




@NgModule({
  declarations: [HeaderComponent, SidebarComponent, AdminLayoutComponent, DashboardComponent, BreadcrumbsComponent, PageNotFoundComponent, CandidatesComponent, SearchPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [AdminLayoutComponent]
})
export class AdminLayoutModule { }
