import { TestBed } from "@angular/core/testing";
import { CourseService } from "./course.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { Course } from "../../featured/dashboard/courses/interfaces/Course";
import { environment } from "../../../environments/environment.development";

fdescribe('Course Service Test', () => {
    let courseService: CourseService;
    let httpMock: HttpTestingController;
    const course: Course = {id: 'shajd', title: 'UX-UI'} as Course;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CourseService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        })

        courseService = TestBed.inject(CourseService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Verifica que no haya solicitudes pendientes
    })

    it('should use POST method to add a new course', () => {
        courseService.addCourse(course).subscribe((response) => {
            expect(response).toEqual(course);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(course);

        req.flush(course); // Simula la respuesta del backend
    });

    it('should use DELETE request to delete a course', () => {
        courseService.deleteCourse(course.id).subscribe((response) => {
            expect(response).toBeTruthy(); // Verifica que la respuesta sea verdadera
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/courses/${course.id}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    })
})