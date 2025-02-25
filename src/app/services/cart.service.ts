import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8000/api';
  private apiUrl = `${this.baseUrl}/cart-items/`;
  private cartVisibilitySubject = new Subject<boolean>();
  cartVisibility$ = this.cartVisibilitySubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getCartItems(): Observable<any[]> {
    if (!this.authService.isAuthenticated()) {
      console.log('Utilisateur non authentifié, retour panier vide');
      return of([]);
    }
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération du panier:', error);
        return of([]);
      })
    );
  }

  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.http.post(this.apiUrl, {
      produit_id: productId,
      quantity: quantity
    });
  }

  updateQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}${productId}/`, {
      quantity: quantity
    });
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${productId}/`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }

  openCart() {
    if (!this.authService.isAuthenticated()) {
      console.log('Tentative d\'ouverture du panier sans authentification');
      // Vous pouvez ajouter ici une redirection vers la page de connexion si nécessaire
      return;
    }
    this.cartVisibilitySubject.next(true);
  }

  closeCart() {
    this.cartVisibilitySubject.next(false);
  }
}
