import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Course } from "../../featured/dashboard/courses/interfaces/Course";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { Store } from "@ngrx/store";
import { CoursesActions } from "../../featured/dashboard/courses/store/courses.actions";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  private coursesTitlesSubject = new BehaviorSubject<string[]>([]);
  coursesTitles$ = this.coursesTitlesSubject.asObservable();

  courseEdit = new BehaviorSubject<Course | null>(null);
  courseEdit$ = this.courseEdit.asObservable();

  constructor(private http: HttpClient, private store: Store) {
    // Al iniciar el servicio, cargamos los cursos
    this.getCourses().subscribe((courses) => {
      this.coursesSubject.next(courses);
      this.getCoursesTitles();
    });
  }

  getCourses(): Observable<Course[]> {
    console.log('Llamando al backend para obtener cursos desde:', `${environment.apiUrl}/courses`);
    return this.http.get<Course[]>(`${environment.apiUrl}/courses`);
  }

  getCoursesTitles(): void {
    this.courses$.pipe(take(1)).subscribe(courses => {
      const names = courses.map((course) => course.title);
      this.coursesTitlesSubject.next(names);
    });
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${environment.apiUrl}/courses`, course)
  }

  getByTitle(title: string): Observable<Course> {
    return new Observable<Course>((subscriber) => {
      this.courses$.pipe(take(1)).subscribe((courses) => {
        if (courses.length === 0) {
          this.getCourses().subscribe((backendCourses) => {
            this.coursesSubject.next(backendCourses);
            const course = backendCourses.find(c => c.title.toLowerCase() === title.toLowerCase());
            if (course) {
              subscriber.next(course);
            } else {
              subscriber.error('Course not found after loading');
            }
          });
        } else {
          const course = courses.find(c => c.title.toLowerCase() === title.toLowerCase());
          if (course) {
            subscriber.next(course);
          } else {
            subscriber.error('Course not found');
          }
        }
      });
    });
  }

  setUpdateCourse(id: string): void {
    this.courses$.pipe(take(1)).subscribe((courses) => {
      if (courses.length === 0) {
        this.getCourses().subscribe((backendCourses) => {
          this.coursesSubject.next(backendCourses);
          const course = backendCourses.find(c => c.id === id);
          if (!course) {
            alert('Course not found after loading');
            return;
          }
          this.courseEdit.next(course);
        });
      } else {
        const course = courses.find(c => c.id === id);
        if (!course) {
          alert('Course not found');
          return;
        }
        this.courseEdit.next(course);
      }
    });
  }

  updateCourse(course: Course): void {
    this.http.put<Course>(`${environment.apiUrl}/courses/${course.id}`, course).subscribe({
      next: (updatedCourse) => {
        this.courses$.pipe(take(1)).subscribe(courses => {
          const updated = courses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
          this.coursesSubject.next(updated);
          this.coursesTitlesSubject.next(updated.map(c => c.title));
          this.courseEdit.next(null); // Limpiamos el curso editado
        });
      },
      error: (error) => {
        console.error('Error updating course:', error);
      },
    });
  }

  deleteCourse(id: string) {
    return this.http.delete<Course>(`${environment.apiUrl}/courses/${id}`)
  }
}
