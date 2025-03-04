export interface Candidature {
    id: number;
    offre_id: number;
    candidat: number;
    date_candidature: Date;
    cv: File;
    lettre_motivation: string;
    statut: string;
    notes: string;
}
