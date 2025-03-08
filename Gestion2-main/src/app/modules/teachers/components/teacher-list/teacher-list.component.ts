import { Component, OnInit } from '@angular/core';
import { TeacherService, Teacher } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit() {
    console.log('TeacherListComponent chargé'); 
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe({
      next: (data) => {
        console.log('Données récupérées :', data);
        console.log('Nombre de professeurs récupérés :', data.length);
        
        setTimeout(() => {
          this.teachers = data;
        }, 0);
  
        console.log("Données affichées dans le template :", this.teachers);
      },
      error: (err) => console.error('Erreur lors du chargement des professeurs :', err)
    });
  }
  
  deleteTeacher(id?: number) {
    if (id && confirm('Voulez-vous vraiment supprimer ce professeur ?')) {
      this.teacherService.deleteTeacher(id).subscribe(() => {
        this.loadTeachers();
      });
    }
  }
}
