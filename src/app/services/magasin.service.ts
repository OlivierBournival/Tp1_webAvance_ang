import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { Match } from '../models/Match';
import { JoiningMatchData } from '../models/JoiningMatchData';
import { StartMatch, Events } from '../models/events';
import { Card, CardMagasin } from '../models/Card';
import { environment } from 'src/environments/environment.development';

const domain = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MagasinService {
  playerID: number | null = localStorage.getItem('playerID') == null ? null : parseInt(localStorage.getItem('playerID')!);
  domain: string = environment.apiUrl

  turnindex:number = 0;
  constructor(
    public authentificationService: AuthentificationService,
    public http: HttpClient
    
  ) { }

 // Permet de récupérer une carte spécific
  async Getcard(id:number): Promise<Card>
  {
    let x = await lastValueFrom(this.http.get<Card>(domain + 'api/card/GetCard/' + id));

    return x
  }
  async getcardsDailySelection(): Promise<CardMagasin[]>
   {
    let cards = await lastValueFrom(
      this.http.get<CardMagasin[]>(this.domain + 'api/Magasin/DailySelection')
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(cards);

    return  cards;
  } 

  async getcardsWeeklySelection(): Promise<CardMagasin[]>
   {
    let cards = await lastValueFrom(
      this.http.get<CardMagasin[]>(this.domain + 'api/Magasin/WeeklySelection')
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(cards);

    return  cards;
  } 
  async getcardsCurrentOffer(): Promise<CardMagasin>
   {
    let card = await lastValueFrom(
      this.http.get<CardMagasin>(this.domain + 'api/Magasin/CurrentOffer')
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(card);

    return  card;
  } 
}



