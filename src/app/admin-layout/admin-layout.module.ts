import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';



@NgModule({
  declarations: [HeaderComponent, SidebarComponent, AdminLayoutComponent, DashboardComponent, BreadcrumbsComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AdminLayoutComponent]
})
export class AdminLayoutModule { }
