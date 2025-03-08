import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
    
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    console.log('StudentListComponent chargé'); 
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        console.log('Données récupérées :', data);
        console.log('Nombre d\'étudiants récupérés :', data.length);
        
        setTimeout(() => {
          this.students = data;
        }, 0);
  
        console.log("Données affichées dans le template :", this.students);
      },
      error: (err) => console.error('Erreur lors du chargement des étudiants :', err)
    });
  }
  

  deleteStudent(id?: number) {
    if (id && confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }
}
