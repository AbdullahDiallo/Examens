import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimetableService } from '../../services/timetable.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-timetable-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './timetable-edit.component.html',
  styleUrls: ['./timetable-edit.component.css']
})
export class TimetableEditComponent implements OnInit {
  timetableForm: FormGroup;
  timetable: any | null = null;

  constructor(
    private fb: FormBuilder,
    private timetableService: TimetableService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.timetableForm = this.fb.group({
      classroomId: ['', Validators.required],
      subject: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.timetableService.getTimetableById(+id).subscribe(timetable => {
        this.timetable = timetable;
        this.timetableForm.patchValue(timetable);
      });
    }
  }

  saveTimetable() {
    if (this.timetable && this.timetableForm.valid) {
      const updatedTimetable = { ...this.timetable, ...this.timetableForm.value };
      this.timetableService.updateTimetable(updatedTimetable).subscribe({

        next: () => {
          this.router.navigate(['/timetables']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'emploi du temps :', err);
          alert('Une erreur est survenue lors de la mise à jour de l\'emploi du temps.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
