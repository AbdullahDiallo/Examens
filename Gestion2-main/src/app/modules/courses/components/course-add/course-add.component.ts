import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService, private router: Router) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]]
    });
  }

  submitForm() {
    console.log("🚀 Formulaire soumis :", this.courseForm.value);
    
    if (this.courseForm.valid) {
      this.courseService.addCourse(this.courseForm.value).subscribe({
        next: () => {
          console.log("✅ Cours ajouté avec succès !");
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          console.error("❌ Erreur lors de l'ajout du cours :", err);
        }
      });
    } else {
      console.log("❌ Le formulaire est invalide !");
    }
  }
}
