import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Candidature } from '../../../models/candidature';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidaterService } from '../../../services/candidater.service';
import { OffreEmploiService } from '../../../services/offre-emploi.service';

@Component({
  selector: 'app-voir-candidature',
  templateUrl: './voir-candidature.component.html',
  styleUrl: './voir-candidature.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class VoirCandidatureComponent implements OnInit {
  candidatures: Candidature[] = [];
  loading: boolean = true;
  error: string | null = null;
  modalOpen: boolean = false; // Contrôle l'ouverture du modal
  //loading: boolean = false; // Pour afficher un état de chargement
  showUpdateForm = false;
  selectedCandidatureId!: number;
  candidatureSupprimer: number| null = null;
  //@Output() candidatureSupprimee = new EventEmitter<boolean>();
  candidatureId!: number;
  

  constructor(
    private candidaterService: CandidaterService,
    private offreService: OffreEmploiService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.candidatureId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("ID de la candidature récupéré:", this.candidatureId);
    this.MaCandidature();
  }

  modifierCandidature(id: number) {
    this.selectedCandidatureId = id;
    this.showUpdateForm = true;
  }
  
  onCandidatureUpdated() {
    this.showUpdateForm = false;
    this.toastr.success('Candidature mise à jour avec succès');
    this.MaCandidature(); // Recharge les candidatures
  }


  // Méthode pour fermer le modal
  closeModal(): void {
    this.modalOpen = false;
  }


  MaCandidature(){
    const offreId = Number(this.route.snapshot.paramMap.get('id'));  // Récupérer l'ID de l'offre
    console.log("ID de l'offre récupéré:", offreId);
    
    this.candidaterService.getCandidatureByOffre(offreId).subscribe(
      (candidature: Candidature) => {
        console.log("Réponse API:", candidature);
        this.candidatures = [candidature]; // Stocker la candidature
        this.loading = false;
        this.modalOpen = true;
      },
      (error: any) => {
        console.error("Erreur API:", error);
        this.error = "Aucune candidature disponible pour cette offre";
        this.loading = false;
      }
    );
    
  }

  onSupprimerCandidature(){
    this.toastr.success('Candidature supprimée avec succès');
    this.candidatureSupprimer = null;  // Réinitialisation après la suppression effective
    //this.candidatureSupprimee.emit(true);
    this.MaCandidature();  // Recharge la liste des candidatures
  }

}


