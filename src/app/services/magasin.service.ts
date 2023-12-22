import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { Card, CardMagasin } from '../models/Card';
import { environment } from 'src/environments/environment.development';
import { Effect } from '../models/Effect';

const domain = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MagasinService {

  playerID: number | null =
    localStorage.getItem('playerID') == null
      ? null
      : parseInt(localStorage.getItem('playerID')!);
  domain: string = environment.apiUrl;

  turnindex: number = 0;
  constructor(
    public authentificationService: AuthentificationService,
    public http: HttpClient
  ) {}

  // Permet de récupérer une carte spécific
  async Getcard(id: number): Promise<Card> {
    let x = await lastValueFrom(
      this.http.get<Card>(domain + 'api/card/GetCard/' + id)
    );

    return x;
  }
  async getcardsDailySelection(): Promise<CardMagasin[]> {
    let cards = await lastValueFrom(
      this.http.get<CardMagasin[]>(this.domain + 'api/CardService/getallcards') // this.http.get<CardMagasin[]>(this.domain + 'api/Magasin/DailySelection')
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(cards);

    return cards;
  }
  async getEffects(): Promise<Effect[]> {
    console.log('getHomeCards...');

    let effects = await lastValueFrom(
      this.http.get<Array<Effect>>(this.domain + 'api/CardService/GetAllEffect')
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(effects);
    console.log('getEffects done');

    return effects;
  }

  async getcardsWeeklySelection(): Promise<CardMagasin[]> {
    console.log("future err:" );
    console.log(this.domain + 'api/Magasin/WeeklySelection');
    
    let cards = await lastValueFrom(

      this.http.get<CardMagasin[]>(this.domain + 'api/Magasin/WeeklySelection')
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(cards);

    return cards;
  }
  async getAllcards(): Promise<CardMagasin[]> {
    let cards = await lastValueFrom(
      this.http.get<CardMagasin[]>(this.domain + 'api/CardService/getallcards')
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(cards);

    return cards;
  }
  async getcardsCurrentOffer(): Promise<CardMagasin> {
    let card = await lastValueFrom(
      this.http.get<CardMagasin>(this.domain + 'api/Magasin/CurrentOffer')
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(card);

    return card;
  }

  async payement(id:number): Promise<void> {

    let card = await lastValueFrom(this.http.post<any>(this.domain + 'api/Magasin/PaidCard/' + id.toString(), null))
    .catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error')
    });

    console.log(card);
  }

  async payementDeck(name: string) {
    let card = await lastValueFrom(this.http.post<any>(this.domain + 'api/Magasin/PaidDeck/' + name, null))
    .catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error')
    });

    console.log(card);
  }
}
