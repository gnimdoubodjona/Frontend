import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private baseUrl = 'http://127.0.0.1:8000/api/utilisateurs/';

  constructor(private http: HttpClient) {}

  getProfilUtilisateur(utilisateurId: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}${utilisateurId}/`).pipe(
      tap(data => {
        console.log('Données brutes du profil:', JSON.stringify(data, null, 2));
        
        // Vérifier tous les champs importants
        const champsManquants = [];
        if (!data.role) champsManquants.push('role');
        if (!data.disponibilite) champsManquants.push('disponibilite');
        if (!data.bio) champsManquants.push('bio');
        if (!data.numero_telephone) champsManquants.push('numero_telephone');
        
        if (champsManquants.length > 0) {
          console.warn('Champs manquants dans la réponse:', champsManquants);
        }

        // Vérifier si le rôle existe mais sous un nom différent
        const toutesLesCles = Object.keys(data);
        console.log('Toutes les clés de l\'objet:', toutesLesCles);
      })
    );
  }
}
