import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../../models/categorie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionVenteService } from '../../../services/gestion-vente.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-creation-produit',
  templateUrl: './creation-produit.component.html',
  styleUrls: ['./creation-produit.component.css']
})
export class CreationProduitComponent implements OnInit {
  produitForm: FormGroup;
  categories: Categorie[] = [];
  isAuthenticated = false;

  constructor(
    private fb: FormBuilder,
    private gestionVenteService: GestionVenteService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    console.log('CreationProduitComponent constructor called');
    this.produitForm = this.fb.group({
      nom_produit: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      quantite: ['', [Validators.required, Validators.min(1)]],
      categorie: ['', Validators.required],
      photo: [null]
    });
  }

  ngOnInit(): void {
    console.log('CreationProduitComponent ngOnInit called');
    // Vérifier l'état de connexion
    this.authService.currentUser$.subscribe(user => {
      console.log('État de connexion:', !!user);
      this.isAuthenticated = !!user;
      if (!this.isAuthenticated) {
        console.log('Utilisateur non authentifié, redirection vers la page de connexion');
        this.router.navigate(['/login']);
      }
    });

    this.loadCategories();
  }

  loadCategories(): void {
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
          this.toastr.success('Produit créer avec succès!')
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
}
