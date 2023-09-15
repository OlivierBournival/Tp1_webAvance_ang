import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/DTO/RegisterDTO';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hidePassword = true;
  hideConfirmation = true;
  registerDTO: RegisterDTO = new RegisterDTO("", "", "");

  constructor(public authentificationService: AuthentificationService, public router: Router) { }

  ngOnInit() {
  }
  
  async registerAction() {
    await this.authentificationService.register(this.registerDTO);
    // go to /login
    this.router.navigate(['/login']);
  }
}
