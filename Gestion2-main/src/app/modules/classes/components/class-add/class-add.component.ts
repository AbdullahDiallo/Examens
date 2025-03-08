import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-class-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.css']
})
export class ClassAddComponent {
  classForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.classForm = this.fb.group({
      name: ['', Validators.required], // Nom de la classe
      capacity: [0, [Validators.required, Validators.min(1)]] // Capacité (doit être supérieure à 0)
    });
  }

  addClass() {
    if (this.classForm.valid) {
      this.http.post('http://localhost:8083/classroms', this.classForm.value).subscribe({
        next: () => {
          this.router.navigate(['/classes']); 
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de la classe :', err);
          alert('Une erreur est survenue lors de l\'ajout de la classe.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}