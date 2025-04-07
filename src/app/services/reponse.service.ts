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
  

}
