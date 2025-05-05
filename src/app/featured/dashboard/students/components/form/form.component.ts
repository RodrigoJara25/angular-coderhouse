import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { filter, map, Observable, tap } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../../../../../core/injection-token';
import { StudentsService } from '../../../../../core/services/students.service';
import { CourseService } from '../../../../../core/services/course.service';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';


@Component({
  selector: 'student-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  formGroup: FormGroup;
  courseNames!: string[];
  courseTitles: Observable<string[]>;

  constructor(
    private fb: FormBuilder, 
    private matDialog: MatDialog, 
    @Inject(APP_CONFIG) private config: AppConfig, 
    private studentsService: StudentsService,
    private courseService: CourseService,
  ) {

    // imprimos le valor de config
    console.log(config);

    this.formGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      course: [''],
    });

    this.courseTitles = this.courseService.coursesTitles$;

    // Nos suscribimos a un observable
    this.courseService.getCoursesTitles()
    this.courseService.coursesTitles$
    .pipe(
      tap((courses) => console.log(`Tap: ${courses}`)),
      filter((courses)=> courses.length > 0),                       // verificamos que hayan courses 
      map((courses)=>courses.map((course)=>course.toUpperCase())),   // mostramos los cursos en mayuscula
      map((courses)=> courses.sort((a,b)=>a.localeCompare(b))),      // Ordenamos alfabeticamente
      tap((courses) => console.log(`Tap: ${courses}`)),
    )
    .subscribe((courses)=>{
      console.log(courses);
      this.courseNames = courses;
    })
  }

  getCoursesTitles() {
    return this.courseService.coursesTitles$;
  }

  submit() {
    this.matDialog
    .open(DialogComponent, {
      data: {
        title: 'Confirmación',
        content: '¿Estás seguro de que deseas guardar este estudiante?'
      }
    })
    .afterClosed()
    .subscribe({
      next: (confirmed: boolean) => {
        if (confirmed) {
          console.log(this.formGroup.value);
          this.studentsService.addStudentObs(this.formGroup.value);
          this.formGroup.reset();
        }
      },
      error: (error) => {
        console.error('Error: ', error);
      },
    })
  }
}
