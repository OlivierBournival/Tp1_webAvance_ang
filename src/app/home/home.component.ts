import { Component, OnInit } from '@angular/core';
import { Card } from '../model/Card';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MatchServiceService } from '../services/matchService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cards: Card[] = [];
  showModal = false;

  constructor(
    public http: HttpClient,
    public serviceMatch: MatchServiceService
  ) {}

  async ngOnInit() {
    await this.getcards();
  }

  // get all the cards from the server
  async getcards() {
    console.log('getcards...');

    let cards = await lastValueFrom(
      this.http.get<Array<Card>>('https://localhost:7219/api/card/getallcards')
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(cards);

    this.cards = cards;

    console.log('getcards done');
  }

  openJoindreModal() {
    this.showModal = true;
    this.serviceMatch.joinMatch();
  }

  closeJoindreModal() {
    this.showModal = false;
  }
}
