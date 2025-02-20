export interface Produit {
    value(id: number | undefined, value: any): unknown;
    id?: number;
    nom_produit: string;
    description: string;
    prix: number;
    quantite: number;
    categorie: number;
    vendeur?: number;
    vendeur_nom?: string;
    categorie_nom?: string;
    photo?: File | string | null;
    date_creation?: Date;
    date_modification?: Date;
    status?: string;
}
