import { Component } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngsci';

  constructor(public authentificationService: AuthentificationService) { }

  logout() {
    this.authentificationService.logout();
  }
  
}