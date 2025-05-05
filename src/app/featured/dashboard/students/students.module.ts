import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';

import { config } from 'rxjs';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../shared/shared.module';
import { APP_CONFIG } from '../../../core/injection-token';

@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
    StudentsComponent
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
    {   
      provide: APP_CONFIG,  // damos el APP_CONFIG como un Provider
      useValue: config,     // definimos que el valor de APP_CONFIG va a ser el de la variable "config"
    },
    {   // darle un formato por defecto a los fields del formualrio de Angular Material
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'},
    }
  ],
})
export class StudentsModule { }
