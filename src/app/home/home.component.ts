import { Component, OnInit } from '@angular/core';
import { Card } from '../models/Card';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MatchServiceService } from '../services/matchService.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { MagasinService } from '../services/magasin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cards: Card[] = [];
  showModal = false;
  errorMessage: string = '';
  domain: string = environment.apiUrl

  constructor(
    public http: HttpClient,
    public serviceMatch: MatchServiceService,
    public serviceMagasin: MagasinService,
    public router: Router
  ) {}

  async ngOnInit() {
    await this.getcards();
  }
/* to test
  // get all the cards from the server
  async getcards() {
   

    this.cards = await this.serviceMagasin.getAllcards();

    console.log('getcards done');
  }*/
   
  async getcards() {
    console.log('getcards...');

    let cards = await lastValueFrom(
      this.http.get<Array<Card>>(this.domain + 'api/card/GetCardsFromPlayer')//
    ).catch((error) => {
      console.error(error);
      throw Error(error.error?.message ?? 'Unknown error');
    });

    console.log(cards);

    this.cards = cards;

    console.log('getcards done');
  } 

  async openJoindreModal() {
    this.showModal = true;

    let joined = false;

    while (!joined && this.showModal) {
      try {
        joined = await this.serviceMatch.joinMatch();
      } catch (x: any) {
        console.error(x);
        this.errorMessage = x.message;
      }

      if (joined) {
        this.router.navigate(['/match']);
        break;
      }

      await this.delay(1000);
    }
  }
  async SellCard(id: number) {//self explanatory
    return null;
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  closeJoindreModal() {
    this.showModal = false;
  }

  Magasin() {
    this.router.navigate(['/magasin']);
  }
}
