import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TP1';
  email = ""
  cookie = sessionStorage.getItem("token")?.toString()
  estConnecte = false;

  constructor( 
    private route: ActivatedRoute, public authentificationService: AuthentificationService, public router:Router) {
      this.ngOnInit()
     }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  OnInit() {
      this.email = sessionStorage.getItem('email')!;
  }
  
  logout() {
    this.authentificationService.logout();
    this.router.navigate(['/login']);
  }
  
  }