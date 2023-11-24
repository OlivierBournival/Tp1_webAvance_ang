import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { CardComponent } from './components/card/card.component';
import { MatchComponent } from './match/match.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { JoindrePartieModalComponent } from './modals/joindrePartieModal/joindrePartieModal.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiInterceptor } from './api.interceptor';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MagasinComponent } from './magasin/magasin.component';
import { CardMagasinComponent } from './components/cardmagasin/cardmagasin.component';
import { DeckComponent } from './components/deck/deck.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateDeckPageComponent } from './pages/create-deck-page/create-deck-page.component';
import { DeckDetailsComponent } from './pages/deck-details-page/deck-details-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent,
    DeckComponent,
    MatchComponent,
    HomeComponent,
    JoindrePartieModalComponent,
    MagasinComponent,
    CardMagasinComponent,
    CreateDeckPageComponent,
    DeckDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    MatToolbarModule,
    MatProgressBarModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
