import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { CardComponent } from './card/card.component';
import { MatchComponent } from './match/match.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AdministrationComponent } from './administration/administration.component';
import { FormsModule } from '@angular/forms';
import { CardFormComponent } from './card-form/card-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CardFormCreateComponent } from './card-form-create/card-form-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent,
    MatchComponent,
    HomeComponent,
    AdministrationComponent,
    CardFormComponent,
    CardFormCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
