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
  public currentUser$ = this.currentUserSubject.asObservable();
  //handleError: ((err: any, caught: Observable<Object>) => ObservableInput<any>) | undefined;

  constructor(private http: HttpClient) { }

  // register(data: RegisterCredentials): Observable<AuthResponse> {
  //   console.log('Début de la requête d\'inscription');
  //   console.log('URL de l\'API:', this.apiUrl);
  //   console.log('Données reçues dans le service:', data);

  //   // Convertir les données en FormData
  //   const formData = new FormData();
  //   Object.entries(data).forEach(([key, value]) => {
  //     if (value !== null && value !== undefined) {
  //       if (Array.isArray(value)) {
  //         // Convertir les tableaux en JSON string
  //         formData.append(key, JSON.stringify(value));
  //         console.log(`Conversion tableau pour ${key}:`, JSON.stringify(value));
  //       } else if (value instanceof File) {
  //         formData.append(key, value);
  //         console.log(`Ajout fichier pour ${key}`);
  //       } else if (typeof value === 'boolean') {
  //         formData.append(key, value ? 'true' : 'false');
  //         console.log(`Conversion booléen pour ${key}:`, value ? 'true' : 'false');
  //       } else {
  //         formData.append(key, value.toString());
  //         console.log(`Ajout valeur pour ${key}:`, value.toString());
  //       }
  //     }
  //   });

  //   // Log du FormData final
  //   console.log('FormData final:');
  //   Object.entries(data).forEach(([key, value]) => {
  //     console.log(`${key}:`, formData.get(key));
  //   });

  //   const registerUrl = `${this.apiUrl}/auth/register/`;
  //   console.log('URL d\'inscription:', registerUrl);

  //   const headers = new HttpHeaders();
  //   // Ne pas définir Content-Type, il sera automatiquement défini avec la boundary pour FormData

  //   return this.http.post<AuthResponse>(registerUrl, formData, { headers }).pipe(
  //     tap({
  //       next: (response) => {
  //         console.log('Réponse réussie du serveur:', response);
  //         this.currentUserSubject.next(response.user);
  //       },
  //       error: (error) => {
  //         console.error('Erreur lors de l\'inscription:', error);
  //         if (error.error instanceof ErrorEvent) {
  //           // Erreur côté client
  //           console.error('Erreur client:', error.error.message);
  //         } else {
  //           // Erreur côté serveur
            
  //           console.error('Erreur serveur:', {
  //             status: error.status,
  //             body: error.error
  //           });
  //         }
  //         throw error;
  //       }
  //     })
  //   );
  // }



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


  // login(credentials: LoginCredentials): Observable<AuthResponse> {
  //   const formData = new FormData();
  //   formData.append('email', credentials.email);
  //   formData.append('password', credentials.password);

  //   return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login/`, formData).pipe(
  //     tap(response => {
  //       this.currentUserSubject.next(response.user);
  //     })
  //   );
  // }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const body = {
      email: credentials.email,
      password: credentials.password
    };
  
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login/`, body).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
      })
    );
  }
  

  logout(): void {
    this.currentUserSubject.next(null);
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
}
