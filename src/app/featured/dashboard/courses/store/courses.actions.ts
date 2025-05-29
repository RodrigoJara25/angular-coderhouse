import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Course } from '../interfaces/Course';

export const CoursesActions = createActionGroup({
  source: 'Courses/API',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ courses: Course[] }>(),
    'Load Courses Failure': props<{ error: string }>(),
    'Add Course': props<{ course: Course }>(),
    'Add Course Success': props<{ course: Course }>(),
    'Add Course Failure': props<{ error: string }>(),
    'Delete Course': props<{ id: string }>(),
    'Delete Course Success': props<{ id: string }>(),
    'Delete Course Failure': props<{ error: string }>(),
    // 'Upsert Course': props<{ course: Course }>(),
    // 'Add Courses': props<{ courses: Course[] }>(),
    // 'Upsert Courses': props<{ courses: Course[] }>(),
    // 'Update Course': props<{ course: Update<Course> }>(),
    // 'Update Courses': props<{ courses: Update<Course>[] }>(),
    // 'Delete Course': props<{ id: string }>(),
    // 'Delete Courses': props<{ ids: string[] }>(),
    // 'Clear Courses': emptyProps(),
  }
});
