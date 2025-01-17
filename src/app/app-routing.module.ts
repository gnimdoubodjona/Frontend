import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './fonctionnalite/authentification/register/register.component';
import { BodyComponent } from './main/body/body.component';
import { MainLayoutComponent } from './main/layouts/main-layout/main-layout.component';
import { LoginComponent } from './fonctionnalite/authentification/login/login.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'accueil', component: MainLayoutComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }