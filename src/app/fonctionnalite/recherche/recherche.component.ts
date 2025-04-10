import { Component } from '@angular/core';
import { RechercheService } from '../../services/recherche.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css' // Correction : `styleUrls` au lieu de `styleUrl`
})


export class RechercheComponent {
  emplacement: string = '';
  disponibilite: string = '';
  role: string = '';
  results: any[] = [];
  submitted = false;

  constructor(
    private rechercheService: RechercheService,
    private router: Router
  ) {}

  // Déplacez la méthode `onRecherche` en dehors du constructeur
  onRecherche() {
    this.submitted = true;
    this.rechercheService.rechercheUtilisateurs(this.emplacement, this.disponibilite, this.role)
      .subscribe(
        (response: any) => {
          console.log('Résultats reçus:', response); // Pour le débogage
          this.results = response.results || [];
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
          this.results = [];
        }
      );
  }

  voirProfil(userId: number) {
    console.log('Navigation vers le profil:', userId);
    this.router.navigate(['/utilisateur', userId]);
  }
}
