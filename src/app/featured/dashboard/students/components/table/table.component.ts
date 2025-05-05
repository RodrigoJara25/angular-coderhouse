import { Component, OnInit } from '@angular/core';
import { Student } from '../../interfaces/Student';
import { StudentsService } from '../../../../../core/services/students.service';
import { EditStudentsComponent } from '../edit-students/edit-students.component';
import { MatDialog } from '@angular/material/dialog';



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
    'actions'
  ];
  dataSource: Student[] = [];

  // Llamamos y usamos el servicio que contiene el array de estudiantes
  constructor(private studentsService: StudentsService, private dialog: MatDialog) {
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

  // editStudent(student: Student) {
  //   const dialogRef = this.dialog.open(EditStudentsComponent, {
  //     width: '400px',
  //     data: { ...student } // Pasamos una copia del estudiante
  //   });
  
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       // Actualizamos el estudiante en el dataSource
  //       const index = this.dataSource.findIndex(
  //         (s) => s.firstName === student.firstName && s.email === student.email
  //       );
  //       if (index !== -1) {
  //         this.dataSource[index] = result;
  //         this.dataSource = [...this.dataSource]; // Refrescamos la tabla
  //       }
  //     }
  //   });
  // }
  editStudent(student: Student) {
    const dialogRef = this.dialog.open(EditStudentsComponent, {
      width: '400px',
      data: { ...student } // Pasamos una copia del estudiante
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.studentsService.updateStudent(result); // Actualizar en el servicio
      }
    });
  }

  // deleteStudent(student: Student) {
  //   this.dataSource = this.dataSource.filter((s) => s.firstName !== student.firstName || s.email !== student.email);
  // }
  deleteStudent(student: Student) {
    this.studentsService.deleteStudent(student); // Eliminar en el servicio
  }

}
