import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Produit } from '../../../models/produit';
import { GestionVenteService } from '../../../services/gestion-vente.service';
import { Categorie } from '../../../models/categorie';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-boutique-produit',
    templateUrl: './boutique-produit.component.html',
    styleUrl: './boutique-produit.component.css',
    encapsulation: ViewEncapsulation.None,
})
export class BoutiqueProduitComponent implements OnInit {
    produits: Produit[] = [];
    categories: Categorie[] = [];
    loading = true;
    error = '';
    viewMode: 'grid' | 'list' = 'grid';
    currentSort = 'latest';
    selectedCategorie: number | null = null;
    isAuthenticated = false;

    // État des likes pour chaque produit
    likedProducts: Set<number> = new Set();
  
    // État du panier
    cartItems: Map<number, number> = new Map(); // productId -> quantity

    constructor(
        private gestionVenteService: GestionVenteService,
        private router: Router,
        private toastr: ToastrService,
        private authService: AuthService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.loadproduits();
        this.loadCategories();
        this.authService.currentUser$.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    loadproduits(): void {
        this.loading = true;
        console.log('Début du chargement des produits');
        this.gestionVenteService.getProduits().subscribe({
            next: (produits) => {
                console.log('Produits reçus:', produits);
                this.produits = produits;
                this.loading = false;
            },
            error: (err) => {
                console.error('Erreur détaillée:', err);
                this.error = 'Erreur lors du chargement des produits';
                this.loading = false;
            }
        });
    }

    loadCategories(): void {
        this.gestionVenteService.getCategories().subscribe({
            next: (categories) => {
                this.categories = categories;
            },
            error: (err) => {
                console.error('Erreur lors du chargement des catégories:', err);
            }
        });
    }

    addToCart(product: any): void {
        if (!this.isAuthenticated) {
            this.toastr.info('Veuillez vous connecter pour ajouter des produits au panier');
            this.router.navigate(['/auth/login']);
            return;
        }

        console.log('Tentative d\'ajout au panier du produit:', product);
        
        this.cartService.addToCart(product.id).subscribe({
            next: () => {
                this.toastr.success(`${product.nom_produit} ajouté au panier`, 'Succès');
                this.cartService.openCart(); // Ouvre le panier après l'ajout
            },
            error: (error) => {
                console.error('Erreur lors de l\'ajout au panier:', error);
                this.toastr.error('Erreur lors de l\'ajout au panier');
            }
        });
    }

    toggleView(mode: 'grid' | 'list'): void {
        this.viewMode = mode;
    }

    viewDetails(productId: number): void {
        this.router.navigate(['/produits/details', productId]);
    }

    toggleLike(productId: number): void {
        if (!this.isAuthenticated) {
            this.toastr.info('Veuillez vous connecter pour ajouter des produits aux favoris');
            this.router.navigate(['/auth/login']);
            return;
        }

        if (this.likedProducts.has(productId)) {
            this.likedProducts.delete(productId);
            this.toastr.info('Produit retiré des favoris');
        } else {
            this.likedProducts.add(productId);
            this.toastr.success('Produit ajouté aux favoris');
        }
    }

    // Méthode pour obtenir la quantité dans le panier
    getCartQuantity(productId: number): number {
        return this.cartItems.get(productId) || 0;
    }

    // Méthode pour vérifier si un produit est liké
    isProductLiked(productId: number): boolean {
        return this.likedProducts.has(productId);
    }
}
