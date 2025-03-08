import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service'; 

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService, 
    private route: ActivatedRoute, 
    private router: Router 
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      niveau: ['', Validators.required],
      nationality: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Récupération de l'ID de l'étudiant depuis l'URL
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.studentId || isNaN(this.studentId)) {
      console.error("ID étudiant invalide !");
      return;
    }

    console.log("ID de l'étudiant récupéré :", this.studentId);

    // Récupération des données de l'étudiant
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (student) => {
        if (student) {
          console.log("Données de l'étudiant récupérées :", student);

          const studentData = {
            firstName: student.firstName || '',
            lastName: student.lastName || '',
            email: student.email || '',
            phone: student.phone || '',
            birthDate: student.birthDate || '',
            gender: student.gender || '',
            address: student.address || '',
            niveau: student.niveau || '',
            nationality: student.nationality || ''
          };

          console.log("Données injectées dans le formulaire :", studentData);

          setTimeout(() => {
            this.studentForm.patchValue(studentData);
          }, 0);
        } else {
          console.error("Étudiant introuvable !");
        }
      },
      error: (err) => console.error("Erreur lors du chargement de l'étudiant", err)
    });
  }

  updateStudent() {
    if (this.studentForm.invalid) {
      console.error("Formulaire invalide !");
      return;
    }

    let studentData = { ...this.studentForm.value };

    console.log("Données à envoyer pour mise à jour :", studentData);

    this.studentService.updateStudent(this.studentId, studentData).subscribe({
      next: (response) => {
        console.log('Étudiant mis à jour avec succès !', response);
        this.router.navigate(['/students']);
      },
      error: (err) => console.error('Erreur de mise à jour de l\'étudiant', err)
    });
  }
}
