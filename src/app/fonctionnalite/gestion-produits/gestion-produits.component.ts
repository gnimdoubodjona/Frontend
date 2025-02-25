import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../models/categorie';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GestionVenteService } from '../../services/gestion-vente.service';

@Component({
  selector: 'app-gestion-produits',
  templateUrl: './gestion-produits.component.html',
  styleUrls: ['./gestion-produits.component.css']
})
export class GestionProduitsComponent implements OnInit{
  produitForm: FormGroup;
  categories : Categorie[] = [];
  isAuthenticated = false;
  selectedCategoryUnit: string = '';

  constructor(private fb: FormBuilder, private gestionVenteService: GestionVenteService, private authService: AuthService, private router: Router){
    this.produitForm = this.fb.group({
      nom_produit: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      quantite: ['', [Validators.required, Validators.min(1)]],
      categorie: ['', Validators.required],
      photo: [null]
    });

    
  //écouter les changement de catégories
    this.produitForm.get('categorie')?.valueChanges.subscribe(categorieId => {
      const categorie = this.categories.find(c => c.id === +categorieId);
      this.selectedCategoryUnit = categorie?.unitee || '';
  });
  }


  ngOnInit(): void {
    console.log('CreationProduitComponent ngOnInit called');
    
    // Charger les catégories
    this.gestionVenteService.getCategories().subscribe({
      next: (categories) => {
        console.log('Catégories chargées:', categories);
        this.categories = categories;
        
        // Initialiser l'unité de la catégorie actuelle
        const categorieId = this.produitForm.get('categorie')?.value;
        const categorie = this.categories.find(c => c.id === categorieId);
        this.selectedCategoryUnit = categorie?.unitee || '';
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    });

    // Vérifier l'état de connexion
    this.authService.currentUser$.subscribe(user => {
      console.log('État de connexion:', !!user);
      this.isAuthenticated = !!user;
      
      if (!this.isAuthenticated) {
        console.log('Utilisateur non authentifié, redirection vers la page de connexion');
        this.router.navigate(['/login']);
      }
    });
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

  onSubmit() {
    console.log('Tentative de soumission du formulaire');
    console.log('État de connexion:', this.isAuthenticated);
    
    if (!this.isAuthenticated) {
      console.error('Utilisateur non authentifié');
      this.router.navigate(['/login']);
      return;
    }

    if (this.produitForm.valid) {
      const formData = new FormData();
      const produitData = this.produitForm.value;
      
      // Ajout des champs texte
      formData.append('nom_produit', produitData.nom_produit);
      formData.append('description', produitData.description);
      formData.append('prix', produitData.prix);
      formData.append('quantite', produitData.quantite);
      formData.append('categorie', produitData.categorie);

      // Ajout de la photo si elle existe
      const photoInput = document.querySelector('#photo') as HTMLInputElement;
      if (photoInput && photoInput.files && photoInput.files[0]) {
        formData.append('photo', photoInput.files[0]);
      }

      console.log('Envoi des données du produit:', produitData);
      
      this.gestionVenteService.createProduit(formData).subscribe(
        (response) => {
          console.log('Produit créé avec succès', response);
          // Redirection après création réussie
          this.router.navigate(['/mes-produits']);
        },
        (error) => {
          console.error('Erreur lors de la création du produit', error);
          if (error.status === 401) {
            console.error('Erreur d\'authentification - redirection vers login');
            this.router.navigate(['/login']);
          }
        }
      );
    } else {
      console.error('Formulaire invalide:', this.produitForm.errors);
    }
  }

  // Ouvrir le modal
  openModal() {
    const modal = document.getElementById('produitModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  // Fermer le modal
  closeModal() {
    const modal = document.getElementById('produitModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  
}
