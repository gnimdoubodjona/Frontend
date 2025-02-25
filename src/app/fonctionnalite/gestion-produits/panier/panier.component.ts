import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

interface CartItem {
  produit: {
    id: number;
    nom_produit: string;
    prix: number;
    photo: string;
  };
  quantity: number;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy {
  isCartOpen = false;
  cartItems: CartItem[] = [];
  isAuthenticated = false;
  private cartVisibilitySubscription: Subscription;
  private authSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    console.log('PanierComponent: Initialisation...');
    
    // S'abonner aux changements d'authentification
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.loadCartItems();
      } else {
        this.cartItems = [];
      }
    });

    // S'abonner aux changements de visibilité du panier
    this.cartVisibilitySubscription = this.cartService.cartVisibility$.subscribe(
      isVisible => {
        console.log('PanierComponent: Changement de visibilité ->', isVisible);
        if (isVisible && !this.isAuthenticated) {
          console.log('Tentative d\'ouverture du panier sans authentification');
          this.router.navigate(['/auth/login']);
          return;
        }
        this.isCartOpen = isVisible;
        if (isVisible) {
          document.body.style.overflow = 'hidden';
          this.loadCartItems(); // Recharger les articles quand le panier s'ouvre
        } else {
          document.body.style.overflow = '';
        }
      }
    );
  }

  ngOnInit() {
    console.log('PanierComponent: ngOnInit');
    if (this.isAuthenticated) {
      this.loadCartItems();
    }
  }

  ngOnDestroy() {
    console.log('PanierComponent: ngOnDestroy');
    if (this.cartVisibilitySubscription) {
      this.cartVisibilitySubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  loadCartItems() {
    if (!this.isAuthenticated) {
      console.log('Pas de chargement du panier : utilisateur non authentifié');
      return;
    }
    
    console.log('Chargement des articles du panier...');
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        console.log('Articles du panier chargés:', items);
        this.cartItems = items;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du panier:', error);
      }
    });
  }

  closeCart() {
    this.cartService.closeCart();
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity < 1) return;
    
    this.cartService.updateQuantity(item.produit.id, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la quantité:', error);
      }
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.produit.id !== productId);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'article:', error);
      }
    });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.produit.prix * item.quantity), 0);
  }
}
