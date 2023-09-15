import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TP1';
  email = ""

  constructor(public authentificationService: AuthentificationService, public router: Router) { }

  ngOnInit(): void {
    if (!this.authentificationService.isConnected()) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authentificationService.logout();
    this.router.navigate(['/login']);
  }

}