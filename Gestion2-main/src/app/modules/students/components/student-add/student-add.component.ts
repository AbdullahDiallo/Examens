import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent {
  studentForm: FormGroup;
  step: number = 1; 
  successMessage: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      niveau: ['', Validators.required],
      nationality: ['', Validators.required],
      matricule: ['', Validators.required]
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



 
  addStudent() {
    if (this.studentForm.valid) {
      this.studentService.addStudent(this.studentForm.value).subscribe({
        next: () => {
       
          this.successMessage = 'Étudiant ajouté avec succès !';

         
          setTimeout(() => {
            this.router.navigate(['/students']);
          }, 2000);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'étudiant :', err);
          alert('Une erreur est survenue lors de l\'ajout de l\'étudiant.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}