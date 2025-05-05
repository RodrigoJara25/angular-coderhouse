import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { CoursesComponent } from './courses.component';
import { DetailsComponent } from './pages/details/details.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    TableComponent,
    FormComponent,
    CoursesComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
