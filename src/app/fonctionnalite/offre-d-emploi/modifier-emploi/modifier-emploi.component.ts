import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OffreDEmploi } from '../../../models/offre-d-emploi';
import { OffreEmploiService } from '../../../services/offre-emploi.service';

@Component({
  selector: 'app-modifier-emploi',
  templateUrl: './modifier-emploi.component.html',
  styleUrl: './modifier-emploi.component.css'
})
export class ModifierEmploiComponent implements OnInit {
  @Input() emploiId!: number;
  @Output() emploiModifie = new EventEmitter<void>();
  
  modifierForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private offreEmploiService: OffreEmploiService,
    private toastr: ToastrService
  ) {
    this.modifierForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      type_emploi: ['', Validators.required],
      region: ['', Validators.required],
      competences_requises: ['', Validators.required],
      salaire: ['', Validators.required],
      date_expiration: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loading = true;
    this.offreEmploiService.getOffreById(this.emploiId).subscribe({
      next: (offre: OffreDEmploi) => {
        this.modifierForm.patchValue({
          titre: offre.titre,
          description: offre.description,
          type_emploi: offre.type_emploi,
          region: offre.region,
          competences_requises: offre.competences_requises,
          salaire: offre.salaire,
          date_expiration: offre.date_expiration
        });
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erreur:', err);
        this.toastr.error('Erreur lors du chargement de l\'offre');
        this.loading = false;
      }
    });
  }
  
  onSubmit() {
    if (this.modifierForm.valid) {
      const offreData = this.modifierForm.value;
      this.offreEmploiService.updateOffre(this.emploiId, offreData).subscribe({
        next: () => {
          this.toastr.success('Offre modifiée avec succès');
          this.emploiModifie.emit();
        },
        error: (err: any) => {
          console.error('Erreur:', err);
          this.toastr.error('Erreur lors de la modification de l\'offre');
        }
      });
    }
  }
}
