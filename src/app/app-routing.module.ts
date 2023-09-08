import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { MatchComponent } from './match/match.component';
import { HomeComponent } from './home/home.component';
import { AdministrationComponent } from './administration/administration.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'match', component: MatchComponent },
  { path: 'administration', component: AdministrationComponent},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
