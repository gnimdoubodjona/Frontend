import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject } from 'rxjs';
import { Candidature } from '../models/candidature';

@Injectable({
  providedIn: 'root'
})

export class CandidaterService {
  private apiUrl = 'http://localhost:8000/api';
  private candidatureSupprimeeSource = new Subject<number>();
  candidatureSupprimee$ = this.candidatureSupprimeeSource.asObservable();


  constructor(private http: HttpClient) { }

  notifierSuppression(offreId: number){
    this.candidatureSupprimeeSource.next(offreId);
  }


  createCandidature(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/candidature/`, formData, {
      headers: headers
    });
  }


  checkCandidature(offreId: number): Observable<boolean> {
    console.log(`Vérification de candidature pour offre ${offreId}`);
    return this.http.get<{exists: boolean}>(
      `${this.apiUrl}/candidature/check_status/`,  // Notez le underscore au lieu du tiret
      { 
        params: new HttpParams().set('offre_id', offreId.toString())
      }
    ).pipe(
      map(response => {
        console.log('Réponse de vérification:', response); 
        return response.exists;
      }),
      catchError(error => {
        console.error('Erreur vérification candidature:', error);
        return of(false);
      })
    );
  }

  updateCandidature(id: number, data: FormData | Partial<Candidature>): Observable<Candidature> {
    return this.http.patch<Candidature>(`${this.apiUrl}/candidature/${id}/`, data);
  }

  deleteCandidature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/candidature/${id}/`);
  }

  getCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/candidature/`);
  }

  getCandidatureById(id: number): Observable<Candidature> {
    return this.http.get<Candidature>(`${this.apiUrl}/candidature/${id}/`);
  }
  
  getCandidatureByOffre(offreId: number): Observable<Candidature> {
    return this.http.get<Candidature>(`${this.apiUrl}/candidature/by-offre/${offreId}/`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de la candidature:', error);
        throw error;
      })
    );
  }

  getCandidaturesByOffre(offreId: number):Observable<Candidature[]>{
    return this.http.get<Candidature[]>(`${this.apiUrl}/candidature/all-by-offre/${offreId}/`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des candidatures:', error);
        throw error;
      })
    );
  }

  //appeler la route de vérification de candidature d'un user
  candidater_offres(): Observable<boolean> {
    return this.http.get<{exists: boolean}>(`${this.apiUrl}/candidature/candidater_offres/`).pipe(
      map(response => response.exists),
      catchError(error => {
        console.error('Erreur lors de la vérification de candidature:', error);
        return of(false);
      })
    );
  }
}