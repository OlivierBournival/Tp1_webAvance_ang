import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/DTO/LoginDTO';
import { AuthentificationService } from 'src/app/services/authentification.service';

interface LoginData {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loginDTO: LoginDTO = new LoginDTO('', '');
  message: string = '';
  LoginForm: FormGroup<any>;
  QData: LoginData | null = null;

  constructor(
    public authentificationService: AuthentificationService,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.LoginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.min(3), Validators.max(30)],
        ],
      },
    );

    this.LoginForm.valueChanges.subscribe(() => {
      this.QData = this.LoginForm.value;
    });
  }

  ngOnInit() {}

  async loginAction() {
    try {
      await this.authentificationService.login(this.loginDTO);
      this.router.navigate(['/', this.authentificationService.email]);
    } catch (e: any) {
      this.message = e.message;
    }
  }
}
