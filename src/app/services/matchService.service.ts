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
    console.log('Joining match...');

    let x = await lastValueFrom(
      this.http.post<any>(domain + 'api/Match/JoinMatch', null)
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(x);

    console.log('Joined match');
  }

  async StartMatch(): Promise<void> {}

  async PlayCard(): Promise<void> {}

  async UpdateMatch(): Promise<void> {}
}
