import { Component, ViewEncapsulation } from '@angular/core';
import { OffreDEmploi } from '../../../models/offre-d-emploi';
import { OffreEmploiService } from '../../../services/offre-emploi.service';
import { CandidaterService } from '../../../services/candidater.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-liste-offre',
  templateUrl: './liste-offre.component.html',
  styleUrl: './liste-offre.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ListeOffreComponent {
  offres: OffreDEmploi[] = [];
  loading: boolean = true;
  error: string | null = null;
  modalOuvert = false;
  selectedOffreId: number | null = null;
  hasApplied: boolean = false;
  candidaturesSoumises: { [offreId: number]: boolean } = {}; 
  //candidatureExiste: boolean = false;
  estCree:boolean = false;
  estSupprime: boolean = false;
  private subscription! : Subscription;


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

  afficherBoutonApproprie(offreId : number): string {
    return this.candidaturesSoumises[offreId]? 'Voir candidature': 'postuler';
  }

  onCandidatureCreated(event: boolean) {
    console.log('Candidature créée, événement reçu:', event);
    this.estCree = event;
    
    // Si une candidature a été créée, mettre à jour la liste des candidatures soumises
    if (this.selectedOffreId && event) {
      this.candidaturesSoumises[this.selectedOffreId] = true;
    }
    
    // Fermer le modal après la création
    this.fermerModal();
    
    // Rafraîchir la liste des offres pour refléter le nouvel état
    this.verifierCandidatures();
  }

  onCandidatureSupprimee(event: boolean) {
    console.log('Candidature supprimée, événement reçu:', event);
    this.estSupprime = event;
    
    // Si l'offre est connue, mettre à jour son état
    if (this.selectedOffreId && event) {
      this.candidaturesSoumises[this.selectedOffreId] = false;
    }
    
    // Rafraîchir la liste pour refléter le nouvel état
    this.verifierCandidatures();
  }

    // Dans la méthode pour afficher le bouton correct (à ajouter ou modifier)
    afficherBoutonApproprié(offreId: number): string {
      // Si une candidature a été créée pour cette offre et n'a pas été supprimée
      if (this.candidaturesSoumises[offreId]) {
        return 'Voir candidature';
      } else {
        return 'Postuler';
      }
    }


   // Méthode pour gérer le clic sur le bouton
   onBoutonClick(offreId: number) {
    this.selectedOffreId = offreId;
    
    if (this.candidaturesSoumises[offreId]) {
      // Si l'utilisateur a déjà postulé, naviguer vers la page de détails
      this.voirCandidature(offreId);
    } else {
      // Sinon, ouvrir le modal de candidature
      this.ouvrirModal(offreId);
    }
  }


  ngOnInit(): void {
    this.loadOffres();

    //écouter l'évènement de suppression de candidature
    this.subscription = this.candidaterService.candidatureSupprimee$.subscribe(offreId =>{
      console.log(`Mise à jour après suppression de candidature pour l'offre ${offreId}`);
      this.candidaturesSoumises[offreId]= false;
    })
  }

  ngOnDestroy():void{
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  voirCandidature(id: number){
    if (!id || id === 0) {
        console.error("Erreur: ID de la candidature invalide !");
        return;
    }
    this.router.navigate(['app/voir-candidature', id]);
}

  mettreAJourCandidature(offreId: number) {
    // Mettre à jour l'état de la candidature pour cette offre
    this.candidaturesSoumises[offreId] = false;
  }
  

}