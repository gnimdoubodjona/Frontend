import { Component, ViewEncapsulation } from '@angular/core';
import { OffreDEmploi } from '../../../models/offre-d-emploi';
import { OffreEmploiService } from '../../../services/offre-emploi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lister-emploi',
  templateUrl: './lister-emploi.component.html',
  styleUrls: ['./lister-emploi.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class ListerEmploiComponent {
  offres: OffreDEmploi[] = [];
  loading: boolean = true;
  error: string | null = null;
  emploiAEditer: OffreDEmploi | null = null;
  emploiASupprimer: number | null = null;

  constructor(private offreEmploiService: OffreEmploiService , private router: Router) { }

  loadOffres() {
    this.loading = true;
    this.offreEmploiService.getOffresByUser().subscribe(
      (offres: OffreDEmploi[]) => {
        this.offres = offres;
        this.loading = false;
      },
      (error) => {
        this.error = 'Une erreur s\'est produite lors de la récupération des offres';
        this.loading = false;
      }
    );
  }
  

  ngOnInit(): void {
    this.loadOffres();
  }

  editerEmploi(emploi: OffreDEmploi) {
    this.emploiAEditer = emploi;
  }

  supprimerEmploi(id: number) {
    this.emploiASupprimer = id;
  }

  onEmploiModifie() {
    this.emploiAEditer = null;
    this.loadOffres(); // Recharger la liste après modification
  }

  onEmploiSupprime() {
    this.emploiASupprimer = null;
    this.loadOffres(); // Recharger la liste après suppression
  }

  candidature(offreId: number){
    console.log(offreId);
    this.offreEmploiService.emitOffreId(offreId);
    // [routerLink]="['/app/liste-candidatures']"
    this.router.navigate(['/app/liste-candidatures']);
  }
}
