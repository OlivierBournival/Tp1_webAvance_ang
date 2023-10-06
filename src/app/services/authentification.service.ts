import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginDTO } from '../DTO/LoginDTO';
import { RegisterDTO } from '../DTO/RegisterDTO';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  baseUrl = 'https://localhost:7219/api/';
  accountBaseUrl = this.baseUrl + 'Account/';
  email = localStorage.getItem('email');

  constructor(public http: HttpClient, public cookieService: CookieService) {}

  /**
   * @throws {Error}
   */
  async register(registerDTO: RegisterDTO) {
    console.log('Registering...');

    let result = await lastValueFrom(
      this.http.post<any>(this.accountBaseUrl + 'Register', registerDTO)
    ).catch((error) => {
      console.error(error.error.message);
      throw Error(error.error.message ?? 'Unknown error');
    });

    console.log(result);

    console.log('Registered');

    // auto login
    await this.login(new LoginDTO(registerDTO.email, registerDTO.password));
  }

  /**
   * @throws {Error}
   */
  async login(loginDTO: LoginDTO) {
    console.log('Logging in...');

    const result = await lastValueFrom(
      this.http.post<any>(this.accountBaseUrl + 'Login', loginDTO, {
        withCredentials: true,
      })
    ).catch((error) => {
      console.error(error.error.message);
      throw Error(error.error.message ?? 'Unknown error');
    });

    console.log(result);

    localStorage.setItem('email', loginDTO.email);

    console.log('Logged in');
  }

  async logout() {
    console.log('Logging out...');

    const result = await lastValueFrom(
      this.http.get<any>(this.accountBaseUrl + 'Logout', {
        withCredentials: true,
      })
    ).catch((error) => {
      console.error(error.error.message);
      throw Error(error.error.message ?? 'Unknown error');
    });

    console.log(result);

    localStorage.removeItem('email');

    console.log('Logged out');
  }

  isConnected() {
    return this.cookieService.check('.AspNetCore.Identity.Application');
  }

  getEmail() {
    return localStorage.getItem('email');
  }
}
