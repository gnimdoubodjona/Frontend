import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../../services/produit.service';
import { GestionVenteService } from '../../../services/gestion-vente.service';
import { Produit } from '../../../models/produit';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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
  isAuthenticated = false;

  constructor(
    //private produitService: ProduitService,
    private gestionVenteService: GestionVenteService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Vérifier l'authentification avant de charger les produits
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.chargerProduits();
      } else {
        console.log('Utilisateur non authentifié, redirection vers la page de connexion');
        this.router.navigate(['/auth/login']);
      }
    });
  }

  chargerProduits(): void {
    if (!this.isAuthenticated) {
      this.error = 'Veuillez vous connecter pour voir vos produits';
      return;
    }

    this.loading = true;
    this.error = ''; // Réinitialiser l'erreur

    this.gestionVenteService.getMesProduits().subscribe({
      next: (response) => {
        console.log('Produits chargés:', response);
        this.produits = response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur détaillée:', err);
        this.error = 'Erreur lors du chargement des produits';
        this.loading = false;
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
      'en_attente': 'En attente'
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
