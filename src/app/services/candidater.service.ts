import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidature } from '../models/candidature';

@Injectable({
  providedIn: 'root'
})
export class CandidaterService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }



  createCandidature(formData: FormData): Observable<any> {
    // Ne pas définir Content-Type, le navigateur le fera automatiquement
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/candidature/`, formData, {
      headers: headers
    });
  }

 
  verifierCandidature(offreId: number | null, candidatId: number) {
    return this.http.get<boolean>(`/api/candidature/existe?offre=${offreId}&candidat=${candidatId}`);
  }
  
  //modifier candidatures
  updateCandidature(id: number, candidature: Candidature | Partial<Candidature>): Observable<Candidature> {
    return this.http.put<Candidature>(`${this.apiUrl}/candidature/${id}`, candidature);
  }

  //supprimer candidatures
  deleteCandidature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/candidature/${id}`);
  }

  //liste des candidatures
  getCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/candidature`);
  }

  //recupérer une candidature par son ID
  getCandidatureById(id: number): Observable<Candidature> {
    return this.http.get<Candidature>(`${this.apiUrl}/candidature/${id}`);
  }
  
}
