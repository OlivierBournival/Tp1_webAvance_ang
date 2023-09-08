import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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

  constructor(public authentificationService: AuthentificationService, public router:Router) { }



  ngOnInit() {

  }

  async loginAction() {
    try {

      await this.authentificationService.login(this.loginDTO);
      console.log(this.loginDTO.email);
      this.router.navigate(['', this.loginDTO.email]);
    

    } catch (e: any) {

      this.message = e.message;
    }
  }

}
