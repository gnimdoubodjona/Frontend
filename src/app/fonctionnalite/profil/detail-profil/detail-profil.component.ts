import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilService} from '../../../services/profil.service';
import { Utilisateur } from '../../../models/utilisateur';
import { AuthService } from '../../../services/auth.service';
import { first, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-detail-profil',
  templateUrl: './detail-profil.component.html',
  styleUrls: ['./detail-profil.component.css']
})
export class DetailProfilComponent implements OnInit {
  utilisateur: Utilisateur | null = null;
  currentUser: Utilisateur | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private profilService: ProfilService, 
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Vérifier d'abord si un token existe
    const token = this.authService.getToken();
    if (!token) {
      console.warn('Aucun token trouvé - redirection vers la page de connexion');
      this.router.navigate(['/login']);
      return;
    }

    // Récupérer l'utilisateur courant d'abord
    this.authService.currentUser$.pipe(first()).subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log('Utilisateur courant:', user);

        // Récupérer l'ID depuis l'URL ou utiliser l'ID de l'utilisateur courant
        const utilisateurId = Number(this.route.snapshot.paramMap.get('id')) || user?.id;
        console.log('ID à utiliser:', utilisateurId);

        if (utilisateurId) {
          this.loading = true;
          this.profilService.getProfilUtilisateur(utilisateurId)
            .pipe(
              catchError(err => {
                console.error('Erreur détaillée:', err);
                if (err.message === 'Utilisateur non trouvé') {
                  return of(null);
                }
                throw err;
              })
            )
            .subscribe({
              next: (data: Utilisateur | null) => {
                if (!data) {
                  this.error = "Utilisateur non trouvé";
                  this.loading = false;
                  return;
                }

                console.log('Données reçues du serveur:', data);
                // Logs spécifiques pour les champs qui posent problème
                // if (data.role === 'agriculteur') {
                //   console.log('Type de cultures:', data.type_cultures);
                //   console.log('Surface exploitée:', data.surface_exploitee);
                //   console.log('Certification bio:', data.certification_bio);
                // }
                
                this.utilisateur = data;
                console.log('Utilisateur après affectation:', this.utilisateur);
                this.loading = false;

                if (!this.utilisateur.role) {
                  console.warn('Le rôle est manquant dans les données reçues');
                  this.error = "Certaines informations du profil sont manquantes";
                }
              },
              error: (err) => {
                console.error('Erreur lors du chargement du profil:', err);
                this.error = "Erreur lors du chargement du profil de l'utilisateur";
                this.loading = false;
                
                if (err.status === 401) {
                  this.router.navigate(['/login']);
                }
              }
            });
        } else {
          this.error = "Impossible de déterminer l'utilisateur à afficher";
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur courant:', err);
        this.error = "Erreur lors de la récupération de l'utilisateur courant";
        this.loading = false;
        this.router.navigate(['/login']);
      }
    });
  }

  // Méthodes utilitaires pour vérifier les champs
  hasValue(value: any): boolean {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== null && value !== undefined && value !== '';
  }

  getPhotoUrl(): string {
    return this.utilisateur?.photo_de_profile || 'indisponible';
  }
}
