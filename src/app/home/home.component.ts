import { Component, OnInit } from '@angular/core';
import { Card } from '../models/Card';
import { HttpClient } from '@angular/common/http';
import { MatchServiceService } from '../services/matchService.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Deck } from '../models/Deck';
import { CardsService } from '../services/cards.service';
import { DecksService } from '../services/decks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cards: Card[] = [];
  decks: Deck[] = [];
  showModal = false;
  errorMessage: string = '';
  domain: string = environment.apiUrl;
  showCreerDeckModal = false;

  constructor(
    public http: HttpClient,
    public serviceMatch: MatchServiceService,
    public cardsService: CardsService,
    public decksService: DecksService,
    public router: Router
  ) {}

  async ngOnInit() {
    this.cards = await this.cardsService.getCardsFromPlayer();
    this.decks = await this.decksService.getDecksFromPlayer();
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

  openCreateDeckPage() {
    this.router.navigate(['/create-deck']);
  }
}
