import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {
  private baseUrl= 'http://127.0.0.1:8000'; 


  constructor(private http: HttpClient) { }

  rechercheUtilisateurs(emplacement:string,disponibilite : string, role : string):Observable<any>{
    let params = new HttpParams();

    if (emplacement){
      params = params.set('emplacement', emplacement);

    }
    if (disponibilite) {
      params = params.set('disponibilite', disponibilite);
    }
    if (role) {
      params = params.set('role', role);
    }

    return this.http.get(`${this.baseUrl}/api/recherche`, { params });
  }
}
