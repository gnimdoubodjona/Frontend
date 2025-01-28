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
    FormsModule 
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
