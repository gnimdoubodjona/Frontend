import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { BodyComponent } from './main/body/body.component';
import { AsideComponent } from './main/aside/aside.component';
import { RegisterComponent } from './fonctionnalite/authentification/register/register.component';
import { LoginComponent } from './fonctionnalite/authentification/login/login.component';
import { MainLayoutComponent } from './main/layouts/main-layout/main-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RechercheComponent } from './fonctionnalite/recherche/recherche.component';
import { ProfilComponent } from './fonctionnalite/profil/profil.component';
import { FormsModule } from '@angular/forms';
import { CreationProduitComponent } from './fonctionnalite/gestion-vente/creation-produit/creation-produit.component'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DetailProfilComponent } from './fonctionnalite/profil/detail-profil/detail-profil.component';
import { ListeUtilisateursComponent } from './fonctionnalite/liste-utilisateurs/liste-utilisateurs.component';
import { ForumComponent } from './fonctionnalite/forum/forum.component';
import { GestionProduitsComponent } from './fonctionnalite/gestion-produits/gestion-produits.component';
import { ListeProduitsComponent } from './fonctionnalite/gestion-produits/liste-produits/liste-produits.component';
import { MiseAJourProduitsComponent } from './fonctionnalite/gestion-produits/mise-ajour-produits/mise-ajour-produits.component';
import { SupprimerProduitsComponent } from './fonctionnalite/gestion-produits/supprimer-produits/supprimer-produits.component';
import { BoutiqueProduitComponent } from './fonctionnalite/gestion-produits/boutique-produit/boutique-produit.component';
import { ToastrModule } from 'ngx-toastr';
import { PanierComponent } from './fonctionnalite/gestion-produits/panier/panier.component';
import { OffreDEmploiComponent } from './fonctionnalite/offre-d-emploi/offre-d-emploi.component';
import { CreerEmploiComponent } from './fonctionnalite/offre-d-emploi/creer-emploi/creer-emploi.component';
import { ListerEmploiComponent } from './fonctionnalite/offre-d-emploi/lister-emploi/lister-emploi.component';
import { ModifierEmploiComponent } from './fonctionnalite/offre-d-emploi/modifier-emploi/modifier-emploi.component';
import { SupprimerEmploiComponent } from './fonctionnalite/offre-d-emploi/supprimer-emploi/supprimer-emploi.component';
import { PostulerEmploiComponent } from './fonctionnalite/offre-d-emploi/postuler-emploi/postuler-emploi.component';
import { ListeOffreComponent } from './fonctionnalite/offre-d-emploi/liste-offre/liste-offre.component';
import { GestionCandidatureComponent } from './fonctionnalite/gestion-candidature/gestion-candidature.component';
import { PostulerComponent } from './fonctionnalite/gestion-candidature/postuler/postuler.component';
import { VoirCandidatureComponent } from './fonctionnalite/gestion-candidature/voir-candidature/voir-candidature.component';
import { ModifierCandidatureComponent } from './fonctionnalite/gestion-candidature/modifier-candidature/modifier-candidature.component';
import { SupprimerCandidatureComponent } from './fonctionnalite/gestion-candidature/supprimer-candidature/supprimer-candidature.component';
import { ListeCandidaturesComponent } from './fonctionnalite/gestion-candidature/liste-candidatures/liste-candidatures.component';
import { ReponseComponent } from './fonctionnalite/gestion-candidature/reponse/reponse.component';
import { NotificationsComponent } from './fonctionnalite/gestion-candidature/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    AsideComponent,
    RegisterComponent,
    LoginComponent,
    MainLayoutComponent,
    RechercheComponent,
    ProfilComponent,
    CreationProduitComponent,
    DetailProfilComponent,
    ListeUtilisateursComponent,
    ForumComponent,
    GestionProduitsComponent,
    ListeProduitsComponent,
    MiseAJourProduitsComponent,
    SupprimerProduitsComponent,
    BoutiqueProduitComponent,
    PanierComponent,
    PanierComponent,
    OffreDEmploiComponent,
    CreerEmploiComponent,
    ListerEmploiComponent,
    ModifierEmploiComponent,
    SupprimerEmploiComponent,
    PostulerEmploiComponent,
    ListeOffreComponent,
    GestionCandidatureComponent,
    PostulerComponent,
    VoirCandidatureComponent,
    ModifierCandidatureComponent,
    SupprimerCandidatureComponent,
    ListeCandidaturesComponent,
    ReponseComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ToastrModule.forRoot(), 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
