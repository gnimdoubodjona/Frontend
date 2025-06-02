import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { OffreDEmploi } from '../../../models/offre-d-emploi';
import { OffreEmploiService } from '../../../services/offre-emploi.service';
import { AuthService } from '../../../services/auth.service';
import { Candidature } from '../../../models/candidature';
import { CandidaterService } from '../../../services/candidater.service';
import { ReponseService } from '../../../services/reponse.service';

@Component({
  selector: 'app-liste-candidatures',
  templateUrl: './liste-candidatures.component.html',
  styleUrl: './liste-candidatures.component.css',
  encapsulation: ViewEncapsulation.None,
  
})
export class ListeCandidaturesComponent implements OnInit{

  candidatures: Candidature[] = [];
  loading : boolean = false;
  error : string | null = null;
  reponse:boolean = false;
  @Output() reponseEvent = new EventEmitter<{ reponse: boolean; candidatureId: number }>();
  showModal: boolean = false;
  candidatureEnCours : number | null = null;
  reponseChoisie : boolean = true;


  constructor(private candidaterService : CandidaterService, private offreEmploiService : OffreEmploiService, private reponseService: ReponseService ){

  }

  ouvrirModal(candidatureId : number, reponse : boolean){
    this.showModal = true;
    this.reponseChoisie = reponse;
    this.candidatureEnCours= candidatureId;
  }

  fermerModal(){
    this.showModal = false;
    this.candidatureEnCours = null;
  }

  loadCandidatures(offreId: number) {
    this.loading = true;
    this.candidaterService.getCandidaturesByOffre(offreId).subscribe(
      (candidatures: Candidature[]) => {
        this.candidatures = candidatures; // Stocker la candidature
        console.log("Candidatures récupérées :", candidatures);
      },
      (error: any) => {
        console.error("Erreur API:", error);
        this.error = "Aucune candidatures disponible pour cette offre*****";
        this.loading = false;
      }
    );
  }

  ngOnInit(): void {
    this.offreEmploiService.offreSelected$.subscribe(
      (offreId: number | null) => {  // 🔥 Accepter number | null
        console.log("✅ ID reçu dans ListeCandidaturesComponent :", offreId);
        if (offreId !== null) {  // Vérifier null au lieu de if (offreId)
          this.loadCandidatures(offreId);
        } else {
          console.warn("⚠ Aucun ID d'offre reçu !");
        }
      }
    );
  }
  
  toggleContent(event: Event) {
    // throw new Error('Method not implemented.');
    const item = event.currentTarget as HTMLElement;
    const contenu = item.nextElementSibling as HTMLElement;
    const plusIcon = item.querySelector('.etape-plus') as HTMLElement;

    if(contenu){
      contenu.classList.toggle('active');
      if(plusIcon){
        plusIcon.textContent =contenu.classList.contains('active')? '-' : '+';
      }
    }
  }

}
