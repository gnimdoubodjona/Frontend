import { Component } from '@angular/core';
import { OffreDEmploi } from '../../../models/offre-d-emploi';
import { OffreEmploiService } from '../../../services/offre-emploi.service';

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
 


  constructor(private offreEmploiService: OffreEmploiService) { }

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
        this.loading = false;
      },
      (error) => {
        this.error = 'Une erreur s\'est produite lors de la récupération des offres';
        this.loading = false;
      }
    )
  }

  ngOnInit(): void {
    this.loadOffres();
    
  }
  

}
