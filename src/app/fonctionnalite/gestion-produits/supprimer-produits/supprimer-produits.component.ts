import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GestionVenteService } from '../../../services/gestion-vente.service';

@Component({
  selector: 'app-supprimer-produits',
  templateUrl: './supprimer-produits.component.html',
  styleUrls: ['./supprimer-produits.component.css']
})
export class SupprimerProduitsComponent {
  @Input() produitId!: number;
  @Output() produitSupprime = new EventEmitter<void>();

  constructor(private gestionVenteService: GestionVenteService) {}

  supprimerProduit() {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.gestionVenteService.deleteProduit(this.produitId).subscribe(
        () => {
          console.log('Produit supprimé avec succès');
          this.produitSupprime.emit();
        },
        (error) => {
          console.error('Erreur lors de la suppression du produit', error);
          alert('Erreur lors de la suppression du produit');
        }
      );
    }
  }
}
