import { Component, OnInit } from '@angular/core';
import { LoginDTO } from 'src/app/DTO/LoginDTO';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loginDTO: LoginDTO = new LoginDTO("", "");
  message: string = "";

  constructor(public authentificationService: AuthentificationService) { }

  ngOnInit() {

  }

  async loginAction() {
    try {
      await this.authentificationService.login(this.loginDTO);
    } catch (e: any) {
      this.message = e.message;
    }
  }

}
