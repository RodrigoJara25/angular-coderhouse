import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { CourseService } from '../../../../../core/services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCoursesComponent } from '../edit-courses/edit-courses.component';


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

  // Llamamos y usamos el servicio que contiene el array de estudiantes
  constructor(private courseService: CourseService, private dialog: MatDialog) {
    // this.dataSource = this.studentsService.getStudents();
  }

  // enviamos los datos, por medio del observable, al que este suscrito
  ngOnInit(): void {
    this.courseService.getCourses();
    this.courseService.courses$.subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    });
  }

  editCourse(id: string) {
    // const dialogRef = this.dialog.open(EditCoursesComponent, {
    //     width: '400px',
    //     data: { ...course } // Pasamos una copia del curso
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //     if (result) {
    //         this.courseService.setUpdateCourse(result);
    //     }
    // });
    this.courseService.setUpdateCourse(id); // Enviamos el id del curso a editar
  }

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id); // Eliminar en el servicio
}
}
