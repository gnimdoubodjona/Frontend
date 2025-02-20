import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  //private apiUrl = `${environment.apiUrl}/produits`;
  private apiUrl = 'http://127.0.0.1:8000/api/produits/';

  constructor(private http: HttpClient) { }

  // Récupérer tous les produits
  getProduits(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Récupérer les produits par catégorie
  getProduitsByCategorie(categorieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/?categorie=${categorieId}`);
  }

  // Récupérer les produits par status
  getProduitsByStatus(status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/?status=${status}`);
  }

  // Récupérer mes produits
  getMesProduits(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mes_produits/`);
  }

  // Créer un nouveau produit
  createProduit(produit: any): Observable<any> {
    return this.http.post(this.apiUrl + '/', produit);
  }

  // Mettre à jour un produit
  updateProduit(id: number, produit: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/`, produit);
  }

  // Supprimer un produit
  deleteProduit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/`);
  }
}
