import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TimetableService } from '../../services/timetable.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-timetable-add',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './timetable-add.component.html',
  styleUrls: ['./timetable-add.component.css']
})
export class TimetableAddComponent implements OnInit {
  timetableForm: FormGroup;
  successMessage: string | null = null;
  classrooms: any[] = [];

  constructor(
    private fb: FormBuilder,
    private timetableService: TimetableService,
    private router: Router,
    private http: HttpClient
  ) {
    this.timetableForm = this.fb.group({
      classroomId: ['', Validators.required],
      subject: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClassrooms();
  }

  loadClassrooms() {
    this.http.get<any[]>('http://localhost:8083/classrooms').subscribe(
      (data) => {
        this.classrooms = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des classes :', error);
      }
    );
  }

  addTimetable() {
    if (this.timetableForm.valid) {
      this.timetableService.addTimetable(this.timetableForm.value).subscribe({
        next: () => {
          this.successMessage = 'Emploi du temps ajouté avec succès !';
          setTimeout(() => {
            this.router.navigate(['/timetables']);
          }, 2000);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'emploi du temps :', err);
          alert('Une erreur est survenue lors de l\'ajout de l\'emploi du temps.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
