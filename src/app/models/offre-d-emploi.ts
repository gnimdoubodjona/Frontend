export interface OffreDEmploi {
    id: number;
    titre: string;
    description: string;
    type_emploi: string;
    region: string;
    competences_requises: string;
    salaire: number;
    date_publication?: Date;
    date_expiration: Date;
    est_active?: boolean;
    employeur: number;
}
