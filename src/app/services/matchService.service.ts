import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthentificationService } from './authentification.service';

const domain = 'https://localhost:7219/';

@Injectable({
  providedIn: 'root',
})
export class MatchServiceService {
  constructor(
    public authentificationService: AuthentificationService,
    public http: HttpClient
  ) {}

  async joinMatch(): Promise<void> {
    let x = await lastValueFrom(
      this.http.post<any>(domain + 'api/Match/JoinMatch', null)
    );
    console.log(x);
  }

  async StartMatch(): Promise<void> {}

  async PlayCard(): Promise<void> {}

  async UpdateMatch(): Promise<void> {}
}
