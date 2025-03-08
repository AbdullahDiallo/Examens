import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  courseForm: FormGroup;
  courseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get(`http://localhost:8080/cours/${this.courseId}`).subscribe((course: any) => {
      this.courseForm.patchValue(course);
    });
  }

  submitForm() {
    if (this.courseForm.valid) {
      this.http.put(`http://localhost:8080/cours/${this.courseId}`, this.courseForm.value).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    }
  }
}
