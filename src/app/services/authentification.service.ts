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
  email = localStorage.getItem("email");

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
  async login(loginDTO: LoginDTO): Promise<void> {
    await lastValueFrom(this.http.post<any>(this.accountBaseUrl + "Login", loginDTO, { withCredentials: true })).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? "Unknown error");
    });

    localStorage.setItem("email", loginDTO.email);
  }

  async logout() {
    const result = await lastValueFrom(this.http.get<any>(this.accountBaseUrl + 'Logout', { withCredentials: true })).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? "Unknown error");
    })
    
    console.log(result);
  }

  isConnected() {
    return this.cookieService.check(".AspNetCore.Identity.Application");
  }
}
