import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
togglePasswordVisibility() {
throw new Error('Method not implemented.');
}
  loginForm: FormGroup;
  errorMessage: string = '';
  private currentUserSubject$: BehaviorSubject<any>;
showPassword: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.currentUserSubject$ = new BehaviorSubject<any>(null);
  }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté
    this.authService.currentUser$.subscribe(user => {
      this.currentUserSubject$.next(user);
      if (user) {
        // this.router.navigate(['/app/accueil']);
      }
    });
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //   this.authService.login(this.loginForm.value).subscribe({
  //   next: () => {
  //   // Redirection après connexion réussie
  //   this.router.navigate(['/app/accueil']);
  //   },
  //   error: (error) => {
  //   if (error.status === 401) {
  //   this.errorMessage = 'Email ou mot de passe incorrect';
  //   } else {
  //   this.errorMessage = 'Une erreur est survenue lors de la connexion';
  //   }
  //   console.error('Erreur de connexion:', error);
  //   // error: (err) => console.error('Erreur de connexion:', err.error),
  //   }
  //   });
  //   } else {
  //   this.errorMessage = 'Veuillez remplir correctement tous les champs';
  //   }
  //   } 

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          // Afficher une notification de succès avec SweetAlert
          Swal.fire({
            title: 'Connexion réussie',
            text: 'Vous êtes connecté avec succès !',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'btn btn-success',
            },
            buttonsStyling: false,
          }).then(() => {
            // Redirection après confirmation
            this.router.navigate(['/app/accueil']);
          });
        },
        error: (error) => {
          // Afficher une notification d'erreur avec SweetAlert
          if (error.status === 401) {
            Swal.fire({
              title: 'Erreur de connexion',
              text: 'Email ou mot de passe incorrect',
              icon: 'error',
              confirmButtonText: 'Réessayer',
              customClass: {
                confirmButton: 'btn btn-danger',
              },
              buttonsStyling: false,
            });
          } else {
            Swal.fire({
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la connexion',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn btn-danger',
              },
              buttonsStyling: false,
            });
          }
          console.error('Erreur de connexion:', error);
        },
      });
    } else {
      // Afficher une notification pour les champs invalides
      Swal.fire({
        title: 'Formulaire invalide',
        text: 'Veuillez remplir correctement tous les champs',
        icon: 'warning',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-warning',
        },
        buttonsStyling: false,
      });
    }
  }

  // Getters pour faciliter l'accès aux contrôles du formulaire dans le template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
