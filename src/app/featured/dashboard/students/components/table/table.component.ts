import { Component, OnInit } from '@angular/core';
import { Student } from '../../interfaces/Student';
import { StudentsService } from '../../../../../core/services/students.service';



@Component({
  selector: 'student-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  // componentes de la tabla
  displayedColumns: string[] = [
    'firstName',
    'email',
    'course',
    'createdAt'
  ];
  dataSource: Student[] = [];

  // Llamamos y usamos el servicio que contiene el array de estudiantes
  constructor(private studentsService: StudentsService) {
    // this.dataSource = this.studentsService.getStudents();
  }

  // enviamos los datos, por medio del observable, al que este suscrito
  ngOnInit(): void {
    this.studentsService.getStudentsObs();
    // nos suscribimos al observable, esto nos permite escuchar cuando se recibe un dato
    this.studentsService.students$.subscribe((data)=>{
      console.log(data);
      // En este punto yo ya tengo los datos, asi que los mando al dataSource (la tabla)
      this.dataSource = data;
    });

    this.studentsService.getStudentsPromise()
      .then((value)=>{
        console.log(value);
      })
      .catch((error) => console.log(error));
  }
}
