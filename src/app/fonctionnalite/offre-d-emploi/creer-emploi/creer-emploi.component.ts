import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffreEmploiService } from '../../../services/offre-emploi.service';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-creer-emploi',
  templateUrl: './creer-emploi.component.html',
  styleUrls: ['./creer-emploi.component.css']
})
export class CreerEmploiComponent implements OnInit{
  offreForm: FormGroup;
  //isAuthenticated: false;
  isAuthenticated: boolean = false;
  
  constructor(private fb: FormBuilder, private offreEmploiService: OffreEmploiService, private authService: AuthService, private router: Router, private toastr: ToastrService){
    this.offreForm = this.fb.group({
      titre : ['', Validators.required],
      description : ['', Validators.required],
      type_emploi : ['', Validators.required],
      region : ['', Validators.required],
      competences_requises : ['', Validators.required], 
      salaire : ['', Validators.required],
      date_expiration : new Date(), 
      employeur: ['', Validators.required]
    })
  }


  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      console.log('État de connexion:', !!user);
      this.isAuthenticated = !!user;
      
      if (!this.isAuthenticated) {
        console.log('Utilisateur non authentifié, redirection vers la page de connexion');
        this.router.navigate(['/login']);
      } else if (user) { // Vérification explicite que user existe
        this.offreForm.patchValue({
          employeur: user.id
        });
      }
    });
  }

  onSubmit(){
    console.log('Statut du formulaire:', this.offreForm.status);
    console.log('Valeurs du formulaire:', this.offreForm.value);
    console.log('Erreurs du formulaire:', this.offreForm.errors);

    if (!this.isAuthenticated) {
      console.error('Utilisateur non authentifié');
      this.router.navigate(['/login']);
      return;
    }

    if (this.offreForm.valid) {
      // Envoyer directement les données du formulaire au format JSON
      const offreData = this.offreForm.value;
      
      this.offreEmploiService.createOffre(offreData).subscribe(
        (response) => {
          console.log('Offre créé avec succès', response);
          this.toastr.success('Offre créé avec succès')
          // Redirection après création réussie
          this.router.navigate(['app/liste-offre']);
        },
        (error) => {
          console.error('Erreur lors de la création de l offre', error);
          if (error.status === 401) {
            console.error('Erreur d\'authentification - redirection vers login');
            this.router.navigate(['/login']);
          }
        }
      );
    } else {
      console.error('Formulaire invalide:', this.offreForm.errors);
    }
  }
}
