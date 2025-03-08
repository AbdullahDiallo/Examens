import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.http.get<any[]>('http://localhost:8084/cours').subscribe(data => {
      this.courses = data;
    });
  }

  deleteCourse(id: number) {
    this.http.delete(`http://localhost:8084/cours/${id}`).subscribe(() => {
      this.loadCourses(); 
    });
  }
}
