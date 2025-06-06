import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, ObservableInput, of, tap } from 'rxjs';
import { AuthResponse, LoginCredentials, RegisterCredentials, Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }

    if (storedToken) {
      this.tokenSubject.next(storedToken);
    }
  }



  //recupérer le token dans le localstorage
  getToken(): string | null {
    // const token = this.tokenSubject.value || localStorage.getItem('token');
    // if (token && !this.tokenSubject.value) {
    //   this.tokenSubject.next(token);
    // }
    // return token;
    return this.tokenSubject.value;
  }

  getCurrentUser(): Observable<Utilisateur | null> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUserId(): number {
    const user = this.currentUserSubject.value;
    return user ? user.id : 0;
  }

  register(data: FormData): Observable<any> {
    const url = `${this.apiUrl}/auth/register/`; // Adaptez l'endpoint selon votre API
    return this.http.post(url, data).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(err: any): Observable<any> {
    // Log l'erreur ou faites une autre action si nécessaire
    console.error('Une erreur est survenue:', err);

    // Retourner un Observable vide ou un message d'erreur
    return of({ error: 'Une erreur est survenue' });

  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const body = {
      email: credentials.email,
      password: credentials.password
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login/`, body).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
        if (response.token) {
          this.tokenSubject.next(response.token);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  //recupérer disponibilité
  getDisponibilite(): Observable<any[]> {
    const disponibiliteUrl = `${this.apiUrl}/auth/disponibilite/`;
    return this.http.get<any[]>(disponibiliteUrl).pipe(
      tap({
        next: (disponibilites) => {
          console.log('Disponibilité récupérée:', disponibilites);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de la disponibilité:', error);
          throw error;
        }
      })
    );
  }


  //une des méthodes que j'ai utiliser pour stocker les cookies de login dans le localstorage
  initializeAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token) {
      this.tokenSubject.next(token);
    }
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  // Méthode pour récupérer les rôles disponibles
  getRoles(): Observable<any[]> {
    const rolesUrl = `${this.apiUrl}/auth/roles/`;
    return this.http.get<any[]>(rolesUrl).pipe(
      tap({
        next: (roles) => {
          console.log('Rôles récupérés:', roles);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des rôles:', error);
          throw error;
        }
      })
    );
  }

  isAuthenticated(): boolean {
    //return !!this.currentUserSubject.value && !!this.tokenSubject.value;
    return !!this.tokenSubject.value;

  }
}
