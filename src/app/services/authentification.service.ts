import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginDTO } from '../DTO/LoginDTO';
import { RegisterDTO } from '../DTO/RegisterDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  domain: string = "https://localhost:7219/api/Account";

  constructor(public http: HttpClient) { }

  /** 
  * @throws {Error}
  */
  async login(loginDTO: LoginDTO) {
    const data = await lastValueFrom(this.http.post<any>(this.domain + "/login", loginDTO)).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? "Unknown error");
    })

    localStorage.setItem("authToken", (data as any).token);
  }

  /** 
  * @throws {Error}
  */
  async register(registerDTO: RegisterDTO) {
    await lastValueFrom(this.http.post<any>(this.domain + "/register", registerDTO)).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? "Unknown error");
    });
  }

  logout() {
    localStorage.removeItem("authToken");
  }

  isConnected(): boolean {
    return localStorage.getItem("authToken") != null;
  }
}
