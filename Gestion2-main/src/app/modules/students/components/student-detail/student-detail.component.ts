import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [ RouterModule, CommonModule],
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
  
export class StudentDetailComponent implements OnInit {
  studentId: number | null = null;
  student: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  ngOnInit() {
   
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
  
    if (this.studentId) { 
      this.http.get<any[]>(`http://localhost:8081/students`).subscribe({
        next: (data) => {
          console.log("Données reçues :", data); 
      
          this.student = data.find(student => student.id === this.studentId);
      
          if (!this.student) {
            console.error("Aucun étudiant trouvé avec cet ID !");
          }
        },
        error: (err) => console.error('Erreur lors du chargement des détails de l’étudiant', err)
      });
      
    } else {
      console.error("ID invalide !");
    }
  }
  
}
