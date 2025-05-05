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
    this.courseService.courses$.subscribe((data)=>{
      console.log(data);
      this.dataSource = data;
    });
  }

  editCourse(course: Course) {
    const dialogRef = this.dialog.open(EditCoursesComponent, {
        width: '400px',
        data: { ...course } // Pasamos una copia del curso
    });

    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            this.courseService.updateCourse(result); // Actualizar en el servicio
        }
    });
  }

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course); // Eliminar en el servicio
}
}
