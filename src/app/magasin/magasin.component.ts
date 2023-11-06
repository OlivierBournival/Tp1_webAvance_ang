import { Component, OnInit } from '@angular/core';
import { Card, CardMagasin } from '../models/Card';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MatchServiceService } from '../services/matchService.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit {
  cards: CardMagasin[] = [];
  showModal = false;
  errorMessage: string = '';
  domain: string = environment.apiUrl

  constructor(
    public http: HttpClient,
    public serviceMatch: MatchServiceService,
    public router: Router
  ) {}

  async ngOnInit() {
    await this.getcards();
  }

  // get all the cards from the server
  async getcards() {
    console.log('getcards...');  

    let cards = await lastValueFrom(
      this.http.get<Array<CardMagasin>>(this.domain + 'api/CardService/getallcards')
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(cards);

    this.cards = cards;

    console.log('getcards done');
  }


}
