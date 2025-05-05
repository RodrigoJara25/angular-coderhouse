import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { CoursesComponent } from './courses.component';
import { DetailsComponent } from './pages/details/details.component';
import { SharedModule } from '../../../shared/shared.module';
import { EditCoursesComponent } from './components/edit-courses/edit-courses.component';



@NgModule({
  declarations: [
    TableComponent,
    FormComponent,
    CoursesComponent,
    DetailsComponent,
    EditCoursesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    CoursesComponent,
  ]
})
export class CoursesModule { }
