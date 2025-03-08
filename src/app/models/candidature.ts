export interface Candidature {
    nom: any;
    prenoms: any;
    email: any;
    adresse: any;
    numero_telephone: any;
    id: number;
    offre_id: number;
    candidat: number;
    date_candidature: Date;
    cv: File;
    lettre_motivation: string;
    statut: string;
    notes: string;
}
