import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './fonctionnalite/authentification/register/register.component';
import { BodyComponent } from './main/body/body.component';
import { MainLayoutComponent } from './main/layouts/main-layout/main-layout.component';
import { LoginComponent } from './fonctionnalite/authentification/login/login.component';
import { RechercheComponent } from './fonctionnalite/recherche/recherche.component';
import { ProfilComponent } from './fonctionnalite/profil/profil.component';
//import { CreationProduitComponent } from './fonctionnalite/gestion-vente/creation-produit/creation-produit.component';
import { DetailProfilComponent } from './fonctionnalite/profil/detail-profil/detail-profil.component';
import { ListeUtilisateursComponent } from './fonctionnalite/liste-utilisateurs/liste-utilisateurs.component';
import { ForumComponent } from './fonctionnalite/forum/forum.component';
//import { CreationProduitComponent } from './fonctionnalite/gestion-vente/creation-produit/creation-produit.component';
import { GestionProduitsComponent } from './fonctionnalite/gestion-produits/gestion-produits.component';
import { BoutiqueProduitComponent } from './fonctionnalite/gestion-produits/boutique-produit/boutique-produit.component';

const routes: Routes = [
  // Routes avec authentification nécessitant le layout principal
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      { path: 'utilisateur/:id', component: ProfilComponent },
      { path: 'utilisateur/:id/detail', component: DetailProfilComponent },
      { path: 'recherche', component: RechercheComponent },
      { path: 'accueil', component: BodyComponent },
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'utilisateurs', component: ListeUtilisateursComponent },
      //{ path: 'nouveauxProduits', component: CreationProduitComponent },
      {path: 'creerProduits', component : GestionProduitsComponent},
      {path: 'boutiqueProduit', component: BoutiqueProduitComponent},
      {path: 'forum', component: ForumComponent},
    ]
  },

  //{path: 'creerProduits', component : GestionProduitsComponent},
  
  // Routes d'authentification sans le layout principal
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }