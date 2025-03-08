import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidature } from '../../../models/candidature';
import { CandidaterService } from '../../../services/candidater.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modifier-candidature',
  templateUrl: './modifier-candidature.component.html',
  styleUrls: ['./modifier-candidature.component.css']
})
export class ModifierCandidatureComponent implements OnInit {
  @Input() candidature!: Candidature;
  @Output() fermer = new EventEmitter<void>();
  @Output() candidatureModifiee = new EventEmitter<Candidature>();

  modifierForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private candidaterService: CandidaterService,
    private toastr: ToastrService
  ) {
    this.modifierForm = this.fb.group({
      nom: ['', Validators.required],
      prenoms: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      numero_telephone: ['', Validators.required],
      lettre_motivation: ['', Validators.required],
      cv: [null]
    });
  }

  ngOnInit() {
    if (this.candidature) {
      this.modifierForm.patchValue({
        nom: this.candidature.nom,
        prenoms: this.candidature.prenoms,
        email: this.candidature.email,
        adresse: this.candidature.adresse,
        numero_telephone: this.candidature.numero_telephone,
        lettre_motivation: this.candidature.lettre_motivation
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Content = base64String.split(',')[1];
        this.modifierForm.patchValue({ cv: base64Content });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.modifierForm.valid) {
      const formData = new FormData();
      Object.keys(this.modifierForm.value).forEach(key => {
        if (this.modifierForm.get(key)?.value !== null) {
          formData.append(key, this.modifierForm.get(key)?.value);
        }
      });

      this.candidaterService.updateCandidature(this.candidature.id, formData).subscribe(
        (response) => {
          this.toastr.success('Candidature modifiée avec succès');
          this.candidatureModifiee.emit(response);
          this.fermer.emit();
        },
        (error) => {
          this.toastr.error('Erreur lors de la modification');
        }
      );
    }
  }
}
