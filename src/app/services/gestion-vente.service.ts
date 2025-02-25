import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';
import { Vente } from '../models/vente';
import { tap } from 'rxjs/operators';

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
    console.log('Appel API vers:', url);
    return this.http.get<Produit[]>(url).pipe(
      tap(
        response => console.log('Réponse API produits:', response),
        error => console.error('Erreur API produits:', error)
      )
    );
  }

  getMesProduits(): Observable<any[]> {
    console.log('Appel de getMesProduits()');
    return this.http.get<Produit[]>(`${this.apiUrl}/produits/mes-produits/`).pipe(
      tap(
        response => console.log('Réponse de getMesProduits:', response),
        error => console.error('Erreur dans getMesProduits:', error)
      )
    );
  }
    
  // Création d'un produit
  createProduit(produitData: FormData | Produit): Observable<Produit> {
    console.log('Tentative de création de produit avec les données:', produitData);
    return this.http.post<Produit>(`${this.apiUrl}/produits/`, produitData);
  }

  updateProduit(id: number, produit: FormData | Partial<Produit>): Observable<Produit> {
    console.log('Tentative de mise à jour du produit:', {
      id: id,
      données: produit instanceof FormData ? 'FormData' : produit,
      url: `${this.apiUrl}/produits/${id}/`
    });
    return this.http.patch<Produit>(`${this.apiUrl}/produits/${id}/`, produit).pipe(
      tap(
        response => console.log('Réponse de la mise à jour:', response),
        error => console.error('Erreur détaillée de la mise à jour:', error)
      )
    );
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



  




















//   getProductsByCategory(categoryId: number): Observable<Product[]> {
//     return this.http.get<Product[]>(`${this.apiUrl}/products?category=${categoryId}`);
// }

// // Récupérer les produits en promotion
// getProductsOnSale(): Observable<Product[]> {
//     return this.http.get<Product[]>(`${this.apiUrl}/products?onSale=true`);
// }

// // Trier les produits
// sortProducts(products: Product[], sortBy: string): Product[] {
//     switch (sortBy) {
//         case 'price-low':
//             return [...products].sort((a, b) => a.price - b.price);
//         case 'price-high':
//             return [...products].sort((a, b) => b.price - a.price);
//         case 'rating':
//             return [...products].sort((a, b) => b.rating - a.rating);
//         case 'latest':
//         default:
//             return [...products].sort((a, b) => 
//                 new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//             );
//     }
// }
  
}
