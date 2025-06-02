import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OffreDEmploi } from '../models/offre-d-emploi';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreEmploiService {
  private apiUrl = 'http://localhost:8000/api';
  private offreSelectedSource = new BehaviorSubject<number | null>(null);  // émettre l'id
  offreSelected$ = this.offreSelectedSource.asObservable(); //écouter l'évenement


  constructor(private http: HttpClient) { }

  //méthode pour émettre l'id
  emitOffreId(offreId : number){
    console.log("🔄 Emission de l'ID de l'offre :", offreId);
    this.offreSelectedSource.next(offreId);
  }

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

  //vérifier si l'utlisateur à déjà créer une offre
  a_creer_une_offre(): Observable<boolean> {
    return this.http.get<{exists: boolean}>(`${this.apiUrl}/offreEmploi/a_creer_une_offre/`).pipe(map(res => res.exists));
  }

  getOffresByUser(): Observable<OffreDEmploi[]> {
    const url = `${this.apiUrl}/offreEmploi/mes_offres/`;
    console.log("Appel api :" ,url);
    return this.http.get<OffreDEmploi[]>(url);
    //return this.http.get<OffreDEmploi[]>(`${this.apiUrl}/offreEmploi/mes-offres/`);
  }

  getOffreById(id: number): Observable<OffreDEmploi> {
    return this.http.get<OffreDEmploi>(`${this.apiUrl}/offreEmploi/${id}/`);
  }
  

  

}
