import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {
  teacherId: number | null = null;
  teacher: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
   
   
      this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
    
      if (this.teacherId) { 
        this.http.get<any[]>(`http://localhost:8082/professeurs`).subscribe({
          next: (data) => {
            console.log("Données reçues :", data); 
        
            this.teacher = data.find(student => student.id === this.teacherId);
        
            if (!this.teacher) {
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
