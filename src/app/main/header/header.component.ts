import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Utilisateur } from '../../models/utilisateur';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentDate: Date = new Date();
  currentUser: Utilisateur | null = null;
  cartItemsCount = 0;

  constructor(private authService: AuthService, private cartService: CartService) {}

  ngOnInit() {
    // Mettre à jour la date toutes les minutes
    setInterval(() => {
      this.currentDate = new Date();
    }, 60000);

    // S'abonner aux changements de l'utilisateur courant
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.loadCartItemsCount();
  }

  loadCartItemsCount() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemsCount = items.length;
    });
  }

  openCart(event: Event) {
    event.preventDefault();
    console.log('Ouverture du panier...');
    this.cartService.openCart();
  }

  // Méthode pour formater la date en français
  getFormattedDate(): string {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    
    const day = days[this.currentDate.getDay()];
    const month = months[this.currentDate.getMonth()];
    const date = this.currentDate.getDate();
    const year = this.currentDate.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }
}
