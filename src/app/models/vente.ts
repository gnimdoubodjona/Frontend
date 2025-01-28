export interface Vente {
  id?: number;
  produit: number;
  produit_nom?: string;
  acheteur?: number;
  acheteur_nom?: string;
  vendeur?: number;
  vendeur_nom?: string;
  quantite: number;
  prix_unitaire: number;
  prix_total?: number;
  date_vente?: Date;
  status: 'en_attente' | 'confirmee' | 'annulee';
}
