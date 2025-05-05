import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../../core/services/course.service';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/Course';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  course: Course | undefined
  isLoading: boolean = true;
  error: string | undefined;

  constructor(
    private courseService: CourseService, 
    private activatedRoute: ActivatedRoute
  ) {
    const title = this.activatedRoute.snapshot.paramMap.get('title');
    
    this.courseService.getByTitle(title!).subscribe({
      next: (course) => {
        this.course = course;
        this.isLoading = false;
        console.log(course);
      },
      error: (error) => {
        console.error('Error: ', error);
        this.isLoading = false;
        this.error = error;
      },
    })
  }
}
