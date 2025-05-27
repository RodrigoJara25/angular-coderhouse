import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { CoursesComponent } from './courses.component';
import { DetailsComponent } from './pages/details/details.component';
import { SharedModule } from '../../../shared/shared.module';
import { EditCoursesComponent } from './components/edit-courses/edit-courses.component';
import { StoreModule } from '@ngrx/store';
import { courseFeature } from './store/courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';

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
    StoreModule.forFeature(courseFeature),
    EffectsModule.forFeature([CoursesEffects]),
  ],
  exports: [
    CoursesComponent,
  ],
})
export class CoursesModule { }