import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produit } from '../../../models/produit';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GestionVenteService } from '../../../services/gestion-vente.service';
import { Categorie } from '../../../models/categorie';

@Component({
  selector: 'app-mise-ajour-produits',
  templateUrl: './mise-ajour-produits.component.html',
  styleUrls: ['./mise-ajour-produits.component.css']
})
export class MiseAJourProduitsComponent implements OnInit {
  @Input() produit!: Produit;
  @Output() produitModifie = new EventEmitter<void>();
  categories : Categorie[] = [];
  produitForm: FormGroup;
  selectedCategoryUnit: string = '';

  constructor(private fb: FormBuilder, private gestionVenteService: GestionVenteService) {
    this.produitForm = this.fb.group({
      nom_produit: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      quantite: ['', [Validators.required, Validators.min(1)]],
      categorie: ['', Validators.required],
      photo: [null]
    });

    // Écouter les changements de catégorie
    this.produitForm.get('categorie')?.valueChanges.subscribe(categorieId => {
      const categorie = this.categories.find(c => c.id === +categorieId);
      this.selectedCategoryUnit = categorie?.unitee || '';
    });
  }

  ngOnInit() {
    this.loadCategories();
    if (this.produit) {
      this.produitForm.patchValue(this.produit);
      // Initialiser l'unité de la catégorie actuelle
      const categorieId = this.produit.categorie;
      const categorie = this.categories.find(c => c.id === categorieId);
      this.selectedCategoryUnit = categorie?.unitee || '';
    }
  }

  onPhotoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.produitForm.patchValue({
        photo: file
      });
    }
  }

  loadCategories() {
    console.log('Attempting to load categories...');
     this.gestionVenteService.getCategories().subscribe(
       (categories: Categorie[]) => {
         console.log('Categories loaded:', categories);
         this.categories = categories;
       },
       (error) => {
         console.error('Erreur lors de la récupération des categories', error);
       }
     );
   }

  modifierProduit() {
    if (this.produitForm.valid) {
      const produitData = new FormData();
      
      // Ajout des champs du formulaire à FormData
      Object.keys(this.produitForm.value).forEach(key => {
        if (key !== 'photo') {
          produitData.append(key, this.produitForm.value[key]);
        }
      });

      // Si une nouvelle photo est sélectionnée, l'ajouter
      const photoFile = this.produitForm.get('photo')?.value;
      if (photoFile instanceof File) {
        produitData.append('photo', photoFile);
      }

      console.log('ID du produit:', this.produit.id);
      console.log('Données du formulaire:', this.produitForm.value);
      console.log('État du formulaire:', {
        valid: this.produitForm.valid,
        touched: this.produitForm.touched,
        dirty: this.produitForm.dirty,
        errors: this.produitForm.errors
      });
      
      if (!this.produit.id) {
        console.error('ID du produit manquant');
        alert('Erreur: ID du produit manquant');
        return;
      }

      this.gestionVenteService.updateProduit(this.produit.id, produitData).subscribe({
        next: (response) => {
          console.log('Produit modifié avec succès:', response);
          this.produitModifie.emit();
          // Fermer le modal en ajoutant la classe 'hide' et en supprimant la classe 'show'
          const modalElement = document.getElementById('updateModal');
          if (modalElement) {
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
          }
          // Supprimer le backdrop
          const modalBackdrop = document.querySelector('.modal-backdrop');
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
          // Réinitialiser le formulaire
          this.produitForm.reset();
        },
        error: (error) => {
          console.error('Erreur lors de la modification du produit:', error);
          alert('Erreur lors de la modification du produit. Veuillez réessayer.');
        }
      });
    } else {
      console.log('Formulaire invalide:', this.produitForm.errors);
    }
  }
}
