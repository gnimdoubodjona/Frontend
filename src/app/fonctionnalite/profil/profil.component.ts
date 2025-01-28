import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilService } from '../../services/profil.service';
import { Utilisateur } from '../../models/utilisateur';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  utilisateur: Utilisateur | null = null;
  loading: boolean = true;
  error: string | null = null;
  activeTab: string = 'all'; // Pour suivre l'onglet actif

  constructor(
    private profilService: ProfilService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  navigateToDetails() {
    if (this.utilisateur) {
      this.router.navigate(['/app/utilisateur', this.utilisateur.id, 'detail']);
    }
  }

  // Méthode pour changer d'onglet
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Méthode pour vérifier si un onglet est actif
  isTabActive(tab: string): boolean {
    return this.activeTab === tab;
  }

  ngOnInit(): void {
    // Récupère l'ID utilisateur depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = "ID de l'utilisateur non fourni";
      this.loading = false;
      return;
    }

    const utilisateurId = Number(id);
    if (isNaN(utilisateurId)) {
      this.error = "ID de l'utilisateur invalide";
      this.loading = false;
      return;
    }

    this.profilService.getProfilUtilisateur(utilisateurId).subscribe({
      next: (data) => {
        this.utilisateur = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil:', err);
        this.error = "Erreur lors du chargement du profil de l'utilisateur";
        this.loading = false;
      }
    });
  }
}
