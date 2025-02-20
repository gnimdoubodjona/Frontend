import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../../services/produit.service';
import { GestionVenteService } from '../../../services/gestion-vente.service';
import { Produit } from '../../../models/produit';

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css']
})
export class ListeProduitsComponent implements OnInit {
  produits: any[] = [];
  loading: boolean = false;
  error: string = '';
  produitAEditer: Produit | null = null;
  produitASupprimer: number | null = null;

  constructor(
    private produitService: ProduitService,
    private gestionVenteService: GestionVenteService
  ) { }

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(): void {
    this.loading = true;
    this.gestionVenteService.getMesProduits().subscribe({
      next: (response) => {
        this.produits = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des produits';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  // Formater le prix pour l'affichage
  formatPrix(prix: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(prix);
  }

  // Obtenir le statut en français
  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'disponible': 'Disponible',
      'vendu': 'Vendu',
      'reserve': 'Réservé'
    };
    return statusMap[status] || status;
  }

  loadProduits() {
    this.chargerProduits();
  }

  onProduitModifie() {
    this.produitAEditer = null;
    this.chargerProduits();
  }

  onProduitSupprime() {
    this.produitASupprimer = null;
    this.chargerProduits();
  }
}
