import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { CandidaterService } from '../../../services/candidater.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrl: './postuler.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PostulerComponent implements OnInit {
  postulerForm: FormGroup;
  isAuthenticated: boolean = false;
  isModalOpen: boolean = false;
  @Input() offreId! : number |null;
  @Output() fermer = new EventEmitter<void>();
  hasAlreadyApplied: boolean = false;
  //@Output() candidatureSuccess = new EventEmitter<number>();
  @Output() candidatureSuccess = new EventEmitter<boolean>();
  
  
  constructor(private fb: FormBuilder, private candidaterService: CandidaterService, private authService: AuthService, private toastr: ToastrService, private router : Router) { 
    this.postulerForm = this.fb.group({
      offre_id: ['', Validators.required],  // sera transformé en 'offre' lors de l'envoi
      candidat: ['', Validators.required],  // sera rempli automatiquement
      nom: ['', Validators.required],
      prenoms: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      numero_telephone: ['', Validators.required],
      lettre_motivation: ['', Validators.required],
      cv: ['', Validators.required]
    });
    
  }


  ngOnInit(): void {
    console.log("Offre sélectionnée:", this.offreId);
    
    if (this.offreId) {
      // Vérifier d'abord si l'utilisateur a déjà postulé
      this.candidaterService.checkCandidature(this.offreId).subscribe(
        (exists) => {
          console.log('Statut de la candidature:', exists);
          if (exists) {
            this.toastr.warning('Vous avez déjà postulé à cette offre');
            this.fermer.emit();
          } else {
            this.postulerForm.patchValue({ 
              offre_id: this.offreId, 
              candidat: this.authService.getCurrentUserId() 
            });
          }
        },
        error => {
          console.error('Erreur lors de la vérification de la candidature:', error);
        }
      );
    }
  
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
  
      if (!this.isAuthenticated) {
        console.log('Utilisateur non authentifié, redirection vers la page de connexion');
        this.router.navigate(['/login']);
      } else {
        const userId = user ? user.id : null;
        console.log("ID de l'utilisateur:", userId);
      }
    });
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Extraire uniquement la partie base64 sans le préfixe data:...
        const base64Content = base64String.split(',')[1];
        this.postulerForm.patchValue({
          cv: base64Content
        });
      };
      reader.readAsDataURL(file);
    }
  }
  
  onSubmit() {
    if (this.hasAlreadyApplied) {
      this.toastr.warning('Vous avez déjà postulé à cette offre');
      return;
    } 
    if (this.postulerForm.valid) {
      const formData = new FormData();
      
      // Ajout des champs texte
      formData.append('offre', this.postulerForm.get('offre_id')?.value);
      formData.append('candidat', this.authService.getCurrentUserId().toString());
      formData.append('nom', this.postulerForm.get('nom')?.value);
      formData.append('prenoms', this.postulerForm.get('prenoms')?.value);
      formData.append('email', this.postulerForm.get('email')?.value);
      formData.append('adresse', this.postulerForm.get('adresse')?.value);
      formData.append('numero_telephone', this.postulerForm.get('numero_telephone')?.value);
      formData.append('lettre_motivation', this.postulerForm.get('lettre_motivation')?.value);
  
      // Ajout du CV en base64
      const cvBase64 = this.postulerForm.get('cv')?.value;
      if (cvBase64) {
        formData.append('cv', cvBase64);
      }
  
      console.log('Envoi des données...');
      this.candidaterService.createCandidature(formData).subscribe(
        response => {
          console.log('Succès:', response);
          this.toastr.success('Postulation envoyée avec succès');
          this.candidatureSuccess.emit(true); 
          this.fermer.emit();
        },
        error => {
          console.error('Erreur détaillée:', error.error);
          this.toastr.error('Erreur lors de l\'envoi de la candidature');
        }
      );
    }
  }

  voirCandidature() {
    this.OpenModal();
  }

  OpenModal(){
    this.isModalOpen = true;
  }

  CloseModal(){
    this.isModalOpen = false;
  }

}
