import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { CourseService } from '../../../../../core/services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store';
import { Observable } from 'rxjs';
import { selectCourses, selectError, selectIsLoading } from '../../store/courses.selectors';
import { CoursesActions } from '../../store/courses.actions';


@Component({
  selector: 'course-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  // componentes de la tabla
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'see-more',
    'actions'
  ];
  dataSource: Course[] = [];

  courses$: Observable<Course[]>; 
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  // Llamamos y usamos el servicio que contiene el array de estudiantes
  constructor(private courseService: CourseService, private dialog: MatDialog, private store: Store<RootState>) {
    // this.dataSource = this.studentsService.getStudents();
    this.courses$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
  }

  // enviamos los datos, por medio del observable, al que este suscrito
  ngOnInit(): void {
    // this.courseService.getCourses();
    // this.courseService.courses$.subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.dataSource = data;
    //   },
    //   error: (error) => {
    //     console.error('Error al obtener los cursos:', error);
    //   }
    // });

    this.store.dispatch(CoursesActions.loadCourses()); // Cargamos los cursos al iniciar el componente
    this.store.select(selectCourses).subscribe({
      next: (courses) => {
        console.log('Cursos obtenidos:', courses);
        this.dataSource = courses; // Actualizamos la fuente de datos de la tabla
      },
      error: (error) => {
        console.error('Error al obtener los cursos del store:', error);
      },
    });
  }

  editCourse(id: string) {
    this.courseService.setUpdateCourse(id); // Enviamos el id del curso a editar
  }

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id); // Eliminar en el servicio
}
}
