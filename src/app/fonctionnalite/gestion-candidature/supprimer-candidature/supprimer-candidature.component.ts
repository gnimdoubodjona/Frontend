import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CandidaterService } from '../../../services/candidater.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supprimer-candidature',
  templateUrl: './supprimer-candidature.component.html',
  styleUrl: './supprimer-candidature.component.css'
})
export class SupprimerCandidatureComponent {
  @Input() candidatureId!: number;
  @Input() offreId!:number;
  @Output() candidatureSupprimee = new EventEmitter<void>();
  

  constructor(private candidaterService: CandidaterService, toastr: ToastrService,private router: Router){}

  supprimerCandidature(){
    if(confirm('Voulez-vous retirer votre candidature?')){
      this.candidaterService.deleteCandidature(this.candidatureId).subscribe(
        () =>{
          console.log('Candidature retirée avec succès');
          this.candidaterService.notifierSuppression(this.offreId);
          //this.candidatureSupprimee.emit();
          this.router.navigate(['app/offres-disponible']);
          

        },
        (error)=>{
          console.log('Erreur lors de la suppression de votre candidature veillez réessayer');
          alert('Erreur lors de la suppression de la candidature veillez réessayer');
        }
      )
    }
  }

}