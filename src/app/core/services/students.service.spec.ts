import { TestBed } from "@angular/core/testing";
import { StudentsService } from "./students.service";
import { Student } from "../../featured/dashboard/students/interfaces/Student";
import { skip } from "rxjs";

describe('StudentsService', () => {
    let service: StudentsService;

    const students : Student[] = [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@gmail.com',
            course: 'angular',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@gmail.com',
            course: 'react',
        },
    ]  

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StudentsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return the list of students with getStudents', () => {
        const students = service.getStudents();
        expect(students.length).toBe(2);
    });

    it('should return the list of students as a promise', async () => {
        const students = await service.getStudentsPromise();
        expect(students.length).toEqual(2);
    });

    it('should emit students throught student$ when getStudentsObs is called', (done) => {
        service.students$.pipe(skip(1)).subscribe((students) => {
            expect(students.length).toEqual(2);
            done();
        });
        service.getStudentsObs();
    });

});