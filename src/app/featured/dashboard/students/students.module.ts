import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';

import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../shared/shared.module';
import { EditStudentsComponent } from './components/edit-students/edit-students.component';

@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
    StudentsComponent,
    EditStudentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // MatFormFieldModule,
    // MatSelectModule,
    // ReactiveFormsModule,
    // MatTableModule,
  ],
  exports: [
    StudentsComponent
  ],
  providers: [
    {   // darle un formato por defecto a los fields del formualrio de Angular Material
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'},
    }
  ],
})
export class StudentsModule { }
