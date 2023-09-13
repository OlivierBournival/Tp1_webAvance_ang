import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginDTO } from '../DTO/LoginDTO';
import { RegisterDTO } from '../DTO/RegisterDTO';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  baseUrl = "https://localhost:7219/api/";
  accountBaseUrl = this.baseUrl + "Account/";

  constructor(public http: HttpClient, public cookieService: CookieService) { }

  /** 
  * @throws {Error}
  */
  async register(registerDTO: RegisterDTO) {
    let result = await lastValueFrom(this.http.post<any>(this.accountBaseUrl + "Register", registerDTO)).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? "Unknown error");
    });

    console.log(result);
  }

  /** 
  * @throws {Error}
  */
  async login(loginDTO: LoginDTO) {
    const data = await lastValueFrom(this.http.post<any>(this.accountBaseUrl + "Login", loginDTO)).catch((error) => {
      console.error(error); 
      localStorage.setItem("token", data.token);
      sessionStorage.setItem("email", loginDTO.email);
      throw Error(error.error?.message ?? "Unknown error");
    })

    console.log(data);
  }

  async logout() {
    let result = await lastValueFrom(this.http.get<any>(this.accountBaseUrl + 'Logout')).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? "Unknown error");
    })
    
    console.log(result);
  }
}
