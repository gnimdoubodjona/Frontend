import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OffreEmploiService } from '../../../services/offre-emploi.service';

@Component({
  selector: 'app-supprimer-emploi',
  templateUrl: './supprimer-emploi.component.html',
  styleUrl: './supprimer-emploi.component.css'
})
export class SupprimerEmploiComponent {
  @Input() emploiId!: number;
  @Output() emploiSupprime = new EventEmitter<void>();

  constructor(private offreEmploiService: OffreEmploiService) { }

  supprimerEmploi() {
    if(confirm('Voulez-vous vraiment supprimer cette offre ?')){
      this.offreEmploiService.deleteOffre(this.emploiId).subscribe(() => {
        this.emploiSupprime.emit();
      },
      error => {console.error('Erreur détaillée:', error);
        alert('Erreur lors de la suppression de l\'offre');
      }
    );
    }
  }

} 
