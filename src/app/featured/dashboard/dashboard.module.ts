import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';


@NgModule({
  declarations: [
    DashboardComponent,
    // HomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    RouterModule,
    StudentsModule,
    CoursesModule,
    DashboardRoutingModule,
  ],
  exports: [
    DashboardComponent,
  ]

})
export class DashboardModule { }
