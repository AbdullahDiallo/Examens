import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  classes: any[] = [];

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classService.getAllClasses().subscribe(data => {
      this.classes = data;
    });
  }

  deleteClass(id: number): void {
    this.classService.deleteClass(id).subscribe(() => {
      this.loadClasses();
    });
  }
}
