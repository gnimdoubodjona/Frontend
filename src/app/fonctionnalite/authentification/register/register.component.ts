import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterCredentials } from '../../../models/utilisateur';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  roles: any[] = [];
  disponibilites: any[] = [];
  showAgriculteurFields = false;
  showElevageFields = false;
  showPrestataireFields = false;
  showVeterinaireFields = false;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
showPassword: any;
showConfirmPassword: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      prenoms: ['', [Validators.required, Validators.minLength(2)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      emplacement: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required]],
      bio: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
      numero_telephone: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{8,}$/)]],
      disponibilite: ['', [Validators.required, Validators.minLength(2)]],
      photo_de_profile: [null],

      // Champs pour agriculteur
      type_cultures: [[]],
      surface_exploitee: [0],
      certification_bio: [false],

      // Champs pour éleveur
      type_animaux: [[]],
      nombre_animaux: [0],
      infrastructure_disponible: [''],

      // Champs pour prestataire
      specialites: [[]],
      zone_intervention: [''],
      tarif_horaire: [0],

      // Champs pour vétérinaire
      diplome_veterinaire: [null],
      annees_experience: [0],
      zones_de_consultation: ['']
    }, {
      validators: [this.passwordMatchValidator]
    });

    // Observer les changements du champ role
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.toggleFields(role);
      console.log('Changement de rôle:', role);
    });
  }

  ngOnInit() {
    // Charger les rôles depuis le backend
    this.authService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        console.log('Rôles chargés:', this.roles);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des rôles:', error);
        this.errorMessage = 'Erreur lors du chargement des rôles. Veuillez réessayer.';
      }
    });
    this.authService.getDisponibilite().subscribe({
      next: (disponibilites) => {
        this.disponibilites = disponibilites;
        console.log('Disponibilités chargées:', this.disponibilites);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des disponibilités:', error);
        this.errorMessage = 'Erreur lors du chargement des disponibilités. Veuillez réessayer.';
      }
    });
  }

  // Méthode pour gérer l'ajout d'un chip
  addChip(event: MatChipInputEvent, controlName: string): void {
    const value = (event.value || '').trim();
    if (value) {
      const control = this.registerForm.get(controlName);
      const currentValues = control?.value || [];
      control?.setValue([...currentValues, value]);
      event.chipInput!.clear();
      console.log(`Chip ajouté à ${controlName}:`, value);
      console.log('Valeurs actuelles:', control?.value);
    }
  }

  // Méthode pour gérer la suppression d'un chip
  removeChip(chip: MatChip, controlName: string): void {
    const control = this.registerForm.get(controlName);
    const currentValues = control?.value || [];
    const index = currentValues.indexOf(chip.value);
    if (index >= 0) {
      const newValues = [...currentValues];
      newValues.splice(index, 1);
      control?.setValue(newValues);
      console.log(`Chip supprimé de ${controlName}:`, chip.value);
      console.log('Valeurs actuelles:', control?.value);
    }
  }

  // Méthode pour gérer la sélection de fichiers
  onFileSelected(event: any, controlName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.get(controlName)?.setValue(file);
      console.log(`Fichier sélectionné pour ${controlName}:`, file.name);
    }
  }

  // Méthode pour basculer l'affichage des champs en fonction du rôle
  toggleFields(role: string): void {
    this.showAgriculteurFields = role === 'agriculteur';
    this.showElevageFields = role === 'eleveur';
    this.showPrestataireFields = role === 'prestataire';
    this.showVeterinaireFields = role === 'veterinaire';
  }



  // Validateur de mot de passe
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const password2 = form.get('password2');
    
    if (password && password2 && password.value !== password2.value) {
      password2.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    
    return null;
  }




  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formValue = this.registerForm.value;
  
      const formData = new FormData();
  
      // Ajouter les données de base
      formData.append('nom', formValue.nom);
      formData.append('prenoms', formValue.prenoms);
      formData.append('email', formValue.email);
      formData.append('password', formValue.password);
      formData.append('password2', formValue.password2);
      formData.append('emplacement', formValue.emplacement);
      formData.append('role', formValue.role);
      formData.append('bio', formValue.bio || '');
      formData.append('numero_telephone', formValue.numero_telephone);
      formData.append('disponibilite', formValue.disponibilite);
  
      // Ajouter le fichier, si présent
      if (formValue.photo_de_profile) {
        formData.append('photo_de_profile', formValue.photo_de_profile);
      }
  
      // Ajouter les champs spécifiques au rôle
      switch (formValue.role) {
        case 'agriculteur':
          formData.append('type_cultures', JSON.stringify(formValue.type_cultures));
          formData.append('surface_exploitee', formValue.surface_exploitee.toString());
          formData.append('certification_bio', formValue.certification_bio.toString());
          break;
        case 'eleveur':
          formData.append('type_animaux', JSON.stringify(formValue.type_animaux));
          formData.append('nombre_animaux', formValue.nombre_animaux.toString());
          formData.append('infrastructure_disponible', formValue.infrastructure_disponible);
          break;
        case 'prestataire':
          formData.append('specialites', JSON.stringify(formValue.specialites));
          formData.append('zone_intervention', formValue.zone_intervention);
          formData.append('tarif_horaire', formValue.tarif_horaire.toString());
          break;
        case 'veterinaire':
          formData.append('diplome_veterinaire', formValue.diplome_veterinaire);
          formData.append('annees_experience', formValue.annees_experience.toString());
          formData.append('zones_de_consultation', formValue.zones_de_consultation);
          break;
      }
  
      // Envoi au service
      this.authService.register(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Inscription réussie !';
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Une erreur est survenue.';
        },
      });
    }
    // console.log('Role:', formValue.role);
    // console.log('Champs spécifiques au rôle:', roleSpecificData);

  }
  
}
