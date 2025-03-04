import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OffreDEmploi } from '../models/offre-d-emploi';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreEmploiService {

  private apiUrl = 'http://localhost:8000/api'

  constructor(private http: HttpClient) { }

  //créer des offres
  createOffre(offreData: OffreDEmploi): Observable<OffreDEmploi> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.post<OffreDEmploi>(`${this.apiUrl}/offreEmploi/`, offreData, { headers });
  }

  updateOffre(id: number, offre: FormData | Partial<OffreDEmploi>): Observable<OffreDEmploi> {
    return this.http.patch<OffreDEmploi>(`${this.apiUrl}/offreEmploi/${id}/`, offre).pipe(
      tap(
        response => console.log('Réponse de la mise à jour:', response),
        error => console.error('Erreur détaillée de la mise à jour:', error)
      )
    );
  }

  deleteOffre(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/offreEmploi/${id}/`);
  }

  getOffres(): Observable<OffreDEmploi[]> {
    return this.http.get<OffreDEmploi[]>(`${this.apiUrl}/offreEmploi/`);
  }

  getOffreById(id: number): Observable<OffreDEmploi> {
    return this.http.get<OffreDEmploi>(`${this.apiUrl}/offreEmploi/${id}/`);
  }
  


}
