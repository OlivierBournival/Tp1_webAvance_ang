import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Card } from 'src/app/models/Card';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  domain: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async getCardsFromPlayer(): Promise<Card[]> {
    console.log('getHomeCards...');

    let cards = await lastValueFrom(
      this.http.get<Array<Card>>(this.domain + 'api/card/GetCardsFromPlayer')
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(cards);
    console.log('getHomeCards done');

    return cards;
  }
}
