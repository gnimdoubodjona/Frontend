import { Component, OnInit } from '@angular/core';
import { Candidature } from '../../../models/candidature';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidaterService } from '../../../services/candidater.service';
import { OffreEmploiService } from '../../../services/offre-emploi.service';

@Component({
  selector: 'app-voir-candidature',
  templateUrl: './voir-candidature.component.html',
  styleUrl: './voir-candidature.component.css'
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
  

  constructor(
    private candidaterService: CandidaterService,
    private offreService: OffreEmploiService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.MaCandidature();
  }

  modifierCandidature(id: number) {
    this.selectedCandidatureId = id;
    this.showUpdateForm = true;
  }
  
  onCandidatureUpdated() {
    this.showUpdateForm = false;
    //this.toastr.success('Candidature mise à jour avec succès');
    this.MaCandidature();
  }


  // Méthode pour fermer le modal
  closeModal(): void {
    this.modalOpen = false;
  }


  MaCandidature(){
    const candidatureId = +this.route.snapshot.paramMap.get('offreId')!;
    this.candidaterService.getCandidatureById(candidatureId).subscribe(
      (candidature: Candidature) =>{
        console.log("reponse api: ", candidature);
        console.log("CV URL:", candidature.cv); 
        this.candidatures = [candidature];
        this.loading = false;
        this.modalOpen = true;
        
      },
      (error: any) =>{
        
        //this.error = "Une erreur s\'est produite lors du chargment des offre pour lesquels vous avez postulé";
        this.error = "Aucune candidature disponible pour cette offre";
        this.loading = false;
        
      }
    )
  }

  onSupprimerCandidature(){
    this.candidatureSupprimer = null;
    this.MaCandidature();
  }

  

  // Pour télécharger le CV
  // downloadCV(): void {
  //   if (this.candidature?.cv) {
  //     window.open(this.candidature.cv, '_blank');
  //   }
  // }

}
