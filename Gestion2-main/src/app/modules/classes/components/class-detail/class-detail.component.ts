import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../services/class.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {
  classItem: any;

  constructor(private route: ActivatedRoute, private classService: ClassService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.classService.getClassById(id).subscribe(data => {
        this.classItem = data;
      });
    }
  }
}
