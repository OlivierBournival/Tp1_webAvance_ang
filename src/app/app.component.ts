import { Component } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP1';
  email = "allo"
  cookie = sessionStorage.getItem("token")?.toString()
  estConnecte = false;

  constructor(public authentificationService: AuthentificationService, public router:Router) { }

  oninit(){
 if(this.cookie != null){
  this.estConnecte == true
 }
 
  }
  logout() {
    this.authentificationService.logout();
    this.router.navigate(['/login']);
  }
  
}