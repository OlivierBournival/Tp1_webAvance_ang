import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { MatchComponent } from './match/match.component';
import { HomeComponent } from './home/home.component';
import { authGuardGuard } from './auth-guard.guard';
import { MagasinComponent } from './magasin/magasin.component';
import { CreateDeckPageComponent } from './pages/create-deck-page/create-deck-page.component';
import { DeckDetailsComponent } from './pages/deck-details-page/deck-details-page.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stats', component: StatistiquesComponent },
  { path: 'match', component: MatchComponent },  
  { path: 'magasin', component: MagasinComponent },
  { path: 'create-deck', component: CreateDeckPageComponent },
  { path: 'deck-details/:deckId', component: DeckDetailsComponent }, // Define the route for deck details
  { path: '', component: HomeComponent, canActivate: [authGuardGuard] },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
