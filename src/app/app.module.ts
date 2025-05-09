import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './featured/dashboard/home/home.component';
import { StudentsModule } from './featured/dashboard/students/students.module';
import { CoursesModule } from './featured/dashboard/courses/courses.module';
import { DashboardModule } from './featured/dashboard/dashboard.module';
import { AuthModule } from './featured/auth/auth.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    StudentsModule,
    CoursesModule,
    SharedModule,
    DashboardModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
