import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class ListeUtilisateursService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<{users: Utilisateur[]}> {
    return this.http.get<{users: Utilisateur[]}>(`${this.baseUrl}/api/users`);
  }

  // Sauvegarder l'état de connexion d'un utilisateur
  saveConnectionState(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/${userId}/connection-state`, { isConnected: true });
  }

  // Récupérer l'état de connexion des utilisateurs
  getConnectionStates(): Observable<{[key: number]: boolean}> {
    return this.http.get<{[key: number]: boolean}>(`${this.baseUrl}/api/users/connection-states`);
  }
}
