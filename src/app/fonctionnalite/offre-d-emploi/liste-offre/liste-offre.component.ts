import { Component } from '@angular/core';
import { OffreDEmploi } from '../../../models/offre-d-emploi';
import { OffreEmploiService } from '../../../services/offre-emploi.service';
import { CandidaterService } from '../../../services/candidater.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-offre',
  templateUrl: './liste-offre.component.html',
  styleUrl: './liste-offre.component.css'
})
export class ListeOffreComponent {
  offres: OffreDEmploi[] = [];
  loading: boolean = true;
  error: string | null = null;
  modalOuvert = false;
  selectedOffreId: number | null = null;
  hasApplied: boolean = false;
  candidaturesSoumises: { [offreId: number]: boolean } = {}; 



  constructor(private offreEmploiService: OffreEmploiService, private candidaterService : CandidaterService, private router: Router) { }



  ouvrirModal(id: number) {
    console.log("ID de l'offre sélectionnée:", id);
    console.log("Bouton Postuler cliqué");
    this.selectedOffreId = id;
  }

  // Ferme le modal en réinitialisant l'ID
  fermerModal() {
    this.selectedOffreId = null;
  }

  loadOffres(){
    this.offreEmploiService.getOffres().subscribe(
      (offres: OffreDEmploi[]) => {
        this.offres = offres;
        this.verifierCandidatures();
        this.loading = false;
      },
      (error) => {
        this.error = 'Une erreur s\'est produite lors de la récupération des offres';
        this.loading = false;
      }
    )
  }

  verifierCandidatures() {
    this.offres.forEach(offre => {
      this.candidaterService.checkCandidature(offre.id).subscribe(
        (existe: boolean) => {
          this.candidaturesSoumises[offre.id] = existe;
        },
        error => {
          console.error(`Erreur lors de la vérification de la candidature pour l'offre ${offre.id}:`, error);
        }
      );
    });
  }


  ngOnInit(): void {
    this.loadOffres();
  }

  voirCandidature(id: number){
    this.router.navigate(['app/voir-candidature', id]);
  }

  mettreAJourCandidature(offreId: number) {
    // Mettre à jour l'état de la candidature pour cette offre
    this.candidaturesSoumises[offreId] = false;
  }
  

}