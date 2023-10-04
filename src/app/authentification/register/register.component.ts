import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/DTO/RegisterDTO';
import { AuthentificationService } from 'src/app/services/authentification.service';


interface LoginData {
  Email?: string | null ;
  Password?: string | null ;
  PasswordConfirm?: string| null }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hidePassword = true;
  hideConfirmation = true;
  registerDTO: RegisterDTO = new RegisterDTO('', '', '');
  RegisterForm:FormGroup<any>;
  RegisterData:LoginData | null = null;
  OValidator: any;
  
  constructor(
    public authentificationService: AuthentificationService,
    public router: Router,
    private fb: FormBuilder
  ) {

    
    this.RegisterForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.min(3), Validators.max(30)]],
      passwordConfirm: ['', [Validators.required, Validators.min(3), Validators.max(30)]],
   }, {validators: this.RegisterValidator});


   this.RegisterForm.valueChanges.subscribe(() => {
     this.RegisterData = this.RegisterForm.value;
   }); 
 }

 RegisterValidator(control: AbstractControl): ValidationErrors | null {
  const Email = control.get('Email')?.value;
  const password = control.get('password')?.value;
  const passwordConfirm = control.get('passwordConfirm')?.value;
  let atLeastOneMistake:boolean = false;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailRegex.test(Email)) {
    control.get('Email')?.setErrors({ invalidEmail: true });
    atLeastOneMistake = true;
  }


    if (password != passwordConfirm) {
      control.get('passwordConfirm')?.setErrors({passwordConfirmEqualsPassword:true});
      atLeastOneMistake = true;
   
    }
    return atLeastOneMistake?{atLeastOneMistake:false}:null;

}

  ngOnInit() {}

  async registerAction() {
    await this.authentificationService.register(this.registerDTO);
    this.router.navigate(['/', this.authentificationService.email]);
  }
}
