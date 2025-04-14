import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {
  private apiUrl = 'http://localhost:8000/api';
  private reponseSubject = new BehaviorSubject<{reponse:boolean, candidatureId: number | null}>({reponse:false, candidatureId:null});
  reponse$= this.reponseSubject.asObservable();

  //envoyer si une reponse est bien envoyée au component bodyyyyy
  private reponseEnvoyeeSource = new BehaviorSubject<boolean>(false);
  reponseEnvoyee$ = this.reponseEnvoyeeSource.asObservable();


  // constructor(private http: HttpClient) { }
  constructor(private http: HttpClient) { }

  createReponse(formData: FormData):Observable<any>{
    return this.http.post(`${this.apiUrl}/reponse/`, formData)
  }
  

  setReponseAvecMotif(reponse: boolean, candidatureId: number, motif: string): Observable<any> {
    const data = {
      reponse: reponse,
      candidature_id: candidatureId,
      motifs: motif
    };
    return this.http.post('http://localhost:8000/api/reponse/', data);
  }

  notifierReponseEnvoyee() {
    console.log('ReponseService: envoyerReponse called, emitting true');
    
    this.reponseEnvoyeeSource.next(true);
    //incrémentons le compteur de reponse
  }
  
  resetReponseEnvoyee() {
    
    this.reponseEnvoyeeSource.next(false);
  }

  getMesReponses():Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/reponse/mes-reponses/`);
  }

}
