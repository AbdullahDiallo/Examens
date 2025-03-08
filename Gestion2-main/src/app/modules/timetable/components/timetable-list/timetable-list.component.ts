import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../services/timetable.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-timetable-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.css']
})
export class TimetableListComponent implements OnInit {
  timetables: any[] = [];

  constructor(private timetableService: TimetableService) { }

  ngOnInit(): void {
    this.timetableService.getAllTimetables().subscribe(timetables => this.timetables = timetables);
  }

  deleteTimetable(id: number) {
    this.timetableService.deleteTimetable(id).subscribe(() => {
      this.timetables = this.timetables.filter(timetable => timetable.id !== id);
    }, error => {
      console.error('Erreur lors de la suppression de l\'emploi du temps :', error);
      alert('Une erreur est survenue lors de la suppression de l\'emploi du temps.');
    });
  }
}
