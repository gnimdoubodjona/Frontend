import { Component } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  currentDate: Date = new Date();
    currentUser: Utilisateur | null = null;
  
    constructor(private authService: AuthService) {}
  
    ngOnInit() {
      // Mettre à jour la date toutes les minutes
      setInterval(() => {
        this.currentDate = new Date();
      }, 60000);
  
      // S'abonner aux changements de l'utilisateur courant
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
      });
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
