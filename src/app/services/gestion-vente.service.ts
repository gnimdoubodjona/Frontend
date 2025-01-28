import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';
import { Vente } from '../models/vente';

@Injectable({
  providedIn: 'root'
})
export class GestionVenteService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  //services pour recupérer les catégories
  getCategories(): Observable<any[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories/`);
  }

  //service pour recupérer les produits :
  getProduits(filters?:{categorie?:number ; status?:string}): Observable<any[]> {
    let url = `${this.apiUrl}/produits/`;
    if (filters) {
      const params = new URLSearchParams();
      if (filters.categorie) {
        params.set('categorie', filters.categorie.toString());
      }
      if (filters.status) {
        params.set('status', filters.status);
      }
      url += `?${params.toString()}`;
    }
    return this.http.get<Produit[]>(url);
  }

  getMesProduits(): Observable<any[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/mes-produits/`);
  }
    
  // Création d'un produit
  createProduit(produitData: FormData | Produit): Observable<Produit> {
    console.log('Tentative de création de produit avec les données:', produitData);
    return this.http.post<Produit>(`${this.apiUrl}/produits/`, produitData);
  }

  updateProduit(id: number, produit: Partial<Produit>): Observable<Produit> {
    return this.http.patch<Produit>(`${this.apiUrl}/produits/${id}/`, produit);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/produits/${id}/`);
  }

  // services pour recupérer les ventes
  getVentes(): Observable<Vente[]> {
    return this.http.get<Vente[]>(`${this.apiUrl}/ventes/`);
  }

  createVente(vente: Vente): Observable<Vente> {
    return this.http.post<Vente>(`${this.apiUrl}/ventes/`, vente);
  }

  confirmerVente(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ventes/${id}/confirmer/`, {});
  }

  annulerVente(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ventes/${id}/annuler/`, {});
  }

  
}
