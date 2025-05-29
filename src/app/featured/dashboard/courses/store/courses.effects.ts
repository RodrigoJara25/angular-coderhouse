import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { CoursesActions } from './courses.actions';
import { CourseService } from '../../../../core/services/course.service';


@Injectable()
export class CoursesEffects {
  // loadCoursess$ = createEffect(() => {
  //   console.log(this.actions$);

  //   return this.actions$.pipe(
  //     ofType(CoursesActions.loadCourses),
  //     concatMap(() =>
  //       this.coursesService.getCourses().pipe(
  //         map((courses) => {
  //           console.log('loadCourses', courses);
  //           return CoursesActions.loadCoursesSuccess({ courses });
  //         }),
  //         catchError((error) => {
  //           console.error('Error loading courses:', error);
  //           return [CoursesActions.loadCoursesFailure({ error })];
  //         })
  //       )
  //     )
  //   );
  // });
  loadCoursess$;
  addCourse$;
  deleteCourse$;

  constructor(private actions$: Actions, private coursesService: CourseService) {
    console.log('Constructor de CoursesEffects ejecutado');

    this.loadCoursess$ = createEffect(() =>
      this.actions$.pipe(
        tap(() => console.log('actions$ recibió un valor')),
        ofType(CoursesActions.loadCourses),
        concatMap(() =>
          this.coursesService.getCourses().pipe(
            map((courses) => {
              console.log('loadCourses', courses);
              return CoursesActions.loadCoursesSuccess({ courses });
            }),
            catchError((error) => {
              console.error('Error loading courses:', error);
              return [CoursesActions.loadCoursesFailure({ error })];
            })
          )
        )
      )
    );

    this.addCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CoursesActions.addCourse),
        concatMap((action)=>
          this.coursesService.addCourse(action.course).pipe(
            map((course) => {
              return CoursesActions.addCourseSuccess({ course });
            }),
            catchError((error) => {
              return [CoursesActions.addCourseFailure({ error })];
            })
          )
        )
      )
    })

    this.deleteCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CoursesActions.deleteCourse),
        concatMap(({ id }) =>{
          return this.coursesService.deleteCourse(id).pipe(
            map(() => {
              return CoursesActions.deleteCourseSuccess({ id: id });
            }),
            catchError((error) => {
              console.log('Error deleting course:', error);
              return [CoursesActions.deleteCourseFailure({ error })];
            })
          );
        })
      );
    });


  }


  // constructor(private actions$: Actions, private coursesService: CourseService) 
  // {
  //   console.log('Constructor de CoursesEffects ejecutado');
  // }
}
