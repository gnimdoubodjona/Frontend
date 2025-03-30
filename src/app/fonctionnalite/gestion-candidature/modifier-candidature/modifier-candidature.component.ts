import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidature } from '../../../models/candidature';
import { CandidaterService } from '../../../services/candidater.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-modifier-candidature',
  templateUrl: './modifier-candidature.component.html',
  styleUrls: ['./modifier-candidature.component.css'] ,
  encapsulation: ViewEncapsulation.None,
})

export class ModifierCandidatureComponent implements OnInit {

  @Input() candidatureId!: number;
  @Output() candidatureUpdated = new EventEmitter<void>();

  updateForm: FormGroup;
  candidature!: Candidature;

  constructor(
    private fb: FormBuilder,
    private candidaterService: CandidaterService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.updateForm = this.fb.group({
      nom: ['', Validators.required],
      prenoms: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      numero_telephone: ['', Validators.required],
      lettre_motivation: ['', Validators.required],
      cv: ['']
    });
  }

  ngOnInit(): void {
    this.loadCandidature();
  }

  loadCandidature() {
    this.candidaterService.getCandidatureById(this.candidatureId).subscribe(
      (data: Candidature) => {
        this.candidature = data;
        this.updateForm.patchValue({
          nom: data.nom,
          prenoms: data.prenoms,
          email: data.email,
          adresse: data.adresse,
          numero_telephone: data.numero_telephone,
          lettre_motivation: data.lettre_motivation
        });
      },
      error => {
        this.toastr.error('Erreur lors du chargement de la candidature');
        console.error(error);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Content = base64String.split(',')[1];
        this.updateForm.patchValue({
          cv: base64Content
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('nom', this.updateForm.get('nom')?.value);
      formData.append('prenoms', this.updateForm.get('prenoms')?.value);
      formData.append('email', this.updateForm.get('email')?.value);
      formData.append('adresse', this.updateForm.get('adresse')?.value);
      formData.append('numero_telephone', this.updateForm.get('numero_telephone')?.value);
      formData.append('lettre_motivation', this.updateForm.get('lettre_motivation')?.value);

      const cvBase64 = this.updateForm.get('cv')?.value;
      if (cvBase64) {
        formData.append('cv', cvBase64);
      }

      this.candidaterService.updateCandidature(this.candidatureId, formData).subscribe(
        () => {
          this.toastr.success('Candidature mise à jour avec succès');
          this.candidatureUpdated.emit();
        },
        error => {
          this.toastr.error('Erreur lors de la mise à jour de la candidature');
          console.error(error);
        }
      );
    }
  }
}
