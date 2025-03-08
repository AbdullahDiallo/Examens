import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalEtudiants: number = 0;
  totalProfesseurs: number = 0;
  totalCours: number = 0;
  totalClasses: number = 0;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getAllStats().subscribe({
      next: (stats) => {
        this.totalEtudiants = stats.totalEtudiants;
        this.totalProfesseurs = stats.totalProfesseurs;
        this.totalCours = stats.totalCours;
        this.totalClasses = stats.totalClasses;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des statistiques', err);
       
        this.totalEtudiants = 0;
        this.totalProfesseurs = 0;
        this.totalCours = 0;
        this.totalClasses = 0;
      },
    });
  }
}