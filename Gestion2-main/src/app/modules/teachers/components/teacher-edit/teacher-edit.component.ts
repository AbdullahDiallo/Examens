import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../services/teacher.service'; 

@Component({
  selector: 'app-teacher-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {
  teacherForm: FormGroup;
  teacherId!: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private teacherService: TeacherService, 
    private route: ActivatedRoute, 
    private router: Router 
  ) {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      specialization: ['', Validators.required],
      nationality: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.teacherId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.teacherId) {
      this.teacherService.getTeacherById(this.teacherId).subscribe((teacher) => {
        if (teacher) {
          this.teacherForm.patchValue(teacher); 
        }
      });
    }
  }

  updateTeacher() {
    if (this.teacherForm.invalid) {
      console.error("Formulaire invalide !");
      return;
    }
  
    let teacherData = this.teacherForm.value;
  
    this.http.put(`http://localhost:8082/professeurs/${this.teacherId}`, teacherData)
      .subscribe({
        next: response => {
          console.log('Professeur mis à jour', response);
          this.router.navigate(['/teachers']);
        },
        error: err => console.error('Erreur de mise à jour', err)
      });
  }
}
