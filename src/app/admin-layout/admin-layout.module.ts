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
import {NgxPaginationModule} from 'ngx-pagination';
import { QuestionComponent } from './question/question.component';
import { ManageTestsComponent } from './manage-tests/manage-tests.component';
import { AddTestComponent } from './manage-tests/add-test/add-test.component';
import { ListTestComponent } from './manage-tests/list-test/list-test.component';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {DataTablesModule} from 'angular-datatables';




@NgModule({
  declarations: [HeaderComponent, SidebarComponent, AdminLayoutComponent, DashboardComponent, BreadcrumbsComponent, PageNotFoundComponent, CandidatesComponent, SearchPipe, QuestionComponent, ManageTestsComponent, AddTestComponent, ListTestComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule,
    LoadingBarHttpClientModule,
    DataTablesModule
    
  ],
  exports: [AdminLayoutComponent]
})
export class AdminLayoutModule { }
