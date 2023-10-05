import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/DTO/LoginDTO';
import { AuthentificationService } from 'src/app/services/authentification.service';

 interface LoginData {
  Email?: string | null ;
  Password?: string | null ;
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
  LoginForm:FormGroup<any>;
  QData:LoginData | null = null;


  constructor(
    public authentificationService: AuthentificationService,
    public router: Router,
    private fb: FormBuilder
  ) {

    this.LoginForm = this.fb.group({
       Email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.min(3), Validators.max(30)]],
    }, {validators: this.LoginValidator});


    this.LoginForm.valueChanges.subscribe(() => {
      this.QData = this.LoginForm.value;
    });
  }

  LoginValidator(control: AbstractControl): ValidationErrors | null {
   const Email = control.get('Email')?.value;
   const password = control.get('Password')?.value;
   let atLeastOneMistake:boolean = false;


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(Email)) {
      control.get('Email')?.setErrors({ invalidEmail: true });
      atLeastOneMistake = true;
    }
   // if (password == null) {
    //  control.get('password')?.setErrors({ passwordlength: true });
   //   atLeastOneMistake = true;
  //  }
    
  
   return atLeastOneMistake?{atLeastOneMistake:true}:null;
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
