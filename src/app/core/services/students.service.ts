import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../../featured/dashboard/students/interfaces/Student';


@Injectable({
  providedIn: 'root'    // puede ser usado en cualquier parte del proyecto
})
export class StudentsService {

  // declaramos el "dataSubject" como un BehaviorSubject
  private dataSubject = new BehaviorSubject<Student[]>([]);
  // Observable: decimos que el "dataSubject" se comporte como un observable
  public students$ = this.dataSubject.asObservable();

  // array de Student[]
  private _students: Student[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      course: 'angular',
      createdAt: new Date(2024, 1, 25),
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@gmail.com',
      course: 'react',
    }
  ];

  getStudents(): Student[] {
    return this._students;
  }

  getStudentsPromise(): Promise<Student[]> {
    // simulamos una promesa con el setTimeout (se va a cargar luego de 2 segundos)
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(this._students);
      }, 2000);
    });
  }

  getStudentsObs() {
    this.dataSubject.next(this._students);
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  addStudentObs(student: Student) {
    this._students = [...this._students, student];
    this.dataSubject.next(this._students);
  }

  constructor() { }
}
