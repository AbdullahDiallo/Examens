import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimetableService } from '../../services/timetable.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timetable-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timetable-detail.component.html',
  styleUrls: ['./timetable-detail.component.css']
})
export class TimetableDetailComponent implements OnInit {
  timetable: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private timetableService: TimetableService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.timetableService.getTimetableById(id).subscribe(timetable => {
      this.timetable = timetable;
    });
  }
}
