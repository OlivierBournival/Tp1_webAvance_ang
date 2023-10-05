import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/DTO/LoginDTO';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loginDTO: LoginDTO = new LoginDTO('', '');

  constructor(
    public authentificationService: AuthentificationService,
    public router: Router
  ) {}

  ngOnInit() {}

  async loginAction() {
    await this.authentificationService.login(this.loginDTO);
    this.router.navigate(['/', this.authentificationService.email]);
  }
}
