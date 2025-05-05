import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { CourseService } from '../../../../../core/services/course.service';


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
  ];
  dataSource: Course[] = [];

  // Llamamos y usamos el servicio que contiene el array de estudiantes
  constructor(private courseService: CourseService) {
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
}
