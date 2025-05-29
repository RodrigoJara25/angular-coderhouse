import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../../../../../core/services/course.service';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';

import { v4 as uuid4 } from 'uuid';
import { Course } from '../../interfaces/Course';
import { RootState } from '../../../../../core/store';
import { Store } from '@ngrx/store';
import { CoursesActions } from '../../store/courses.actions';

@Component({
  selector: 'course-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  formGroup: FormGroup;
  isEdit: boolean = false;

  constructor(private courseService: CourseService, private fb: FormBuilder, private matDialog: MatDialog, private store: Store<RootState>) {

    this.formGroup = this.fb.group({
      id: [],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.courseService.courseEdit$.subscribe((course) => {
      if (course) {
        this.formGroup.patchValue({
          id: course.id,
          title: course.title,
          description: course.description,
        });
        this.isEdit = true;
      } else {
        this.formGroup.reset();
      }
    })

  }

  submit() {
    if (this.formGroup.invalid) {
      console.error('Form is invalid:', this.formGroup.errors);
      return;
    }

    this.formGroup.patchValue({
      id: this.isEdit ? this.formGroup.value.id : uuid4(),
    });
    this.matDialog
      .open(DialogComponent, {
        data: {
          title: 'Confirmación',
          content: '¿Estás seguro de que deseas guardar este curso?'
        }
      })
      .afterClosed()
      .subscribe({
        next: (confirmed: boolean) => {
          if (confirmed) {
            console.log(this.formGroup.value);
            if (this.isEdit) {
              this.courseService.updateCourse(this.formGroup.value);
            } else {
              // this.courseService.addCourse(this.formGroup.value);
              this.store.dispatch(
                CoursesActions.addCourse({course: this.formGroup.value})
              )
            }
            this.formGroup.reset();
            this.isEdit = false;
          }
        },
        error: (error) => {
          console.error('Error: ', error);
        },
    })
  }

  
}
