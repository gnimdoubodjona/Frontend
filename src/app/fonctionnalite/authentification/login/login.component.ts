import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  private currentUserSubject$: BehaviorSubject<any>;

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
        this.router.navigate(['/accueil']);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          // Redirection après connexion réussie
          this.router.navigate(['/accueil']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Email ou mot de passe incorrect';
          } else {
            this.errorMessage = 'Une erreur est survenue lors de la connexion';
          }
          console.error('Erreur de connexion:', error);
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir correctement tous les champs';
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
