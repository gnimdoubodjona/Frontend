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
  

  constructor(
    private candidaterService: CandidaterService,
    private offreService: OffreEmploiService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.MaCandidature();
  }

  // // Méthode pour ouvrir le modal et récupérer les détails de la candidature
  // ouvrirModal(offreId: number): void {
  //   this.loading = true; // On met en état de chargement
  //   this.candidaterService.getCandidatureById(offreId).subscribe(
  //     (candidature) => {
  //       this.candidature = candidature; // On récupère les détails de la candidature
  //       this.loading = false; // On arrête l'état de chargement
  //       this.modalOpen = true; // On ouvre le modal
  //     },
  //     (error) => {
  //       console.error('Erreur lors du chargement de la candidature', error);
  //       this.loading = false;
  //     }
  //   );
  // }

  // Méthode pour fermer le modal
  closeModal(): void {
    this.modalOpen = false;
  }


  MaCandidature(){
    const candidatureId = +this.route.snapshot.paramMap.get('id')!;
    this.candidaterService.getCandidatureById(candidatureId).subscribe(
      (candidature: Candidature) =>{
        this.candidatures = [candidature];
        this.loading = false;
        this.modalOpen = true;
        
      },
      (error: any) =>{
        this.error = "Une erreur s\'est produite lors du chargment des offre pour lesquels vous avez postulé";
        this.loading = false;
        
      }
    )
  }

  

  // Pour télécharger le CV
  // downloadCV(): void {
  //   if (this.candidature?.cv) {
  //     window.open(this.candidature.cv, '_blank');
  //   }
  // }

}
