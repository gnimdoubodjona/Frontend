import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListeUtilisateursService } from '../../services/liste-utilisateurs.service';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur';

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrl: './liste-utilisateurs.component.css',
  encapsulation: ViewEncapsulation.None,
})

export class ListeUtilisateursComponent implements OnInit {
  users: Utilisateur[] = [];
  loading = true;
  error: string | null = null;
  subscribedUsers: Set<number> = new Set();
  user: Utilisateur | null = null;
  
 

  constructor(private listeUtilisateursService: ListeUtilisateursService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadConnectionStates();
  }
  
//méthode pour recupérer la photo de profil de l'utilisateur
getUserPhoto(userId: number): string {
  const user = this.users.find(user => user.id === userId);
  // return user?.photo_de_profile || 'ras'; // Retourne la photo ou un chemin par défaut
  
  return this.user?.photo_de_profile || 'indisponible';
}

  loadUsers(): void {
    this.loading = true;
    this.listeUtilisateursService.getAllUsers().subscribe({
      next: (response: any) => {
        console.log('Données récupérées depuis le service:', response); 
        this.users = response.users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        this.error = 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
      }
    });
  }

  loadConnectionStates(): void {
    this.listeUtilisateursService.getConnectionStates().subscribe({
      next: (states) => {
        Object.keys(states).forEach(userId => {
          if (states[Number(userId)]) {
            this.subscribedUsers.add(Number(userId));
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement des états de connexion:', error);
      }
    });
  }

  subscribe(userId: number): void {
    this.listeUtilisateursService.saveConnectionState(userId).subscribe({
      next: () => {
        this.subscribedUsers.add(userId);
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde de l\'état de connexion:', error);
      }
    });
  }

  isSubscribed(userId: number): boolean {
    return this.subscribedUsers.has(userId);
  }
}
