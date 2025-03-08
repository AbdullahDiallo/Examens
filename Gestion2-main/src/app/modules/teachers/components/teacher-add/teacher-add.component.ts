import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-teacher-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css']
})
export class TeacherAddComponent {
  teacherForm: FormGroup;
  step: number = 1;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private router: Router
  ) {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      specialization: ['', Validators.required], 
      nationality: ['', Validators.required]
    });
  }

  nextStep() {
    if (this.step < 2) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  setStep(step: number) {
    this.step = step;
  }

  addTeacher() {
    if (this.teacherForm.valid) {
      this.teacherService.addTeacher(this.teacherForm.value).subscribe({
        next: () => {
          this.successMessage = 'Professeur ajouté avec succès !';
          
          setTimeout(() => {
            this.router.navigate(['/teachers']);
          }, 2000);
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout du professeur :", err);
          alert("Une erreur est survenue lors de l'ajout du professeur.");
        }
      });
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
