export interface Utilisateur {
    email: string;
    prenoms: string;
    nom: string;
    role: string;
    bio: string;

    photo_de_profile: string;
    numero_telephone: string;
    disponibilite: string;

    emplacement: string;
    password: string;
    password2: string;
    
    types_cultures: string[];
    surface_explotee: number;
    certification_bio: boolean;
    type_animaux: string[];
    nombre_animaux: number;
    infrastructure_disponible: string;
    specialites: string[];
    zone_intervention: string;
    tarif_horaire: number;
    diplome_veterinaire: string;
    annees_experience: number;
    zones_de_consultation: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export type RegisterCredentials = {
    // Champs obligatoires
    nom: string;
    prenoms: string;
    email: string;
    password: string;
    password2: string;
    role: string;
    emplacement: string;
    
    // Champs optionnels
    bio?: string;
    numero_telephone?: string;
    disponibilite?: string;
    photo_de_profile?: File | null;

    // Champs spécifiques aux rôles (tous optionnels)
    type_cultures?: string[];
    surface_exploitee?: number;
    certification_bio?: boolean;
    
    type_animaux?: string[];
    nombre_animaux?: number;
    infrastructure_disponible?: string;
    
    specialites?: string[];
    zone_intervention?: string;
    tarif_horaire?: number;
    
    diplome_veterinaire?: File | null;
    annees_experience?: number;
    zones_de_consultation?: string;
}

export interface AuthResponse {
    token: string;
    user: Utilisateur;
}