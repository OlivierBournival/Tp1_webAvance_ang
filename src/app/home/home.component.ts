// home.component.ts

import { Component, OnInit } from '@angular/core';
import { Card } from '../models/Card';
import { HttpClient } from '@angular/common/http';
import { MatchService } from '../services/match.service';
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
    public serviceMatch: MatchService,
    public cardsService: CardsService,
    public decksService: DecksService,
    public router: Router
  ) {}

  async ngOnInit() {
    this.cards = await this.cardsService.getCardsFromPlayer();
    this.decks = await this.decksService.getDecksFromPlayer();
  }

  async openJoindreModal() {
    // if no deck is selected
    if (this.decksService.selectedDeckId == null) {
      this.errorMessage = 'Aucun deck sélectionné !';
      return;
    } else {
      this.errorMessage = '';
    }

    this.showModal = true;

    try {
      await this.serviceMatch.joinMatch();
    } catch (x: any) {
      console.error(x);
      this.errorMessage = x.message;
    }
  }

  async SellCard(id: number) {
    // self-explanatory
    return null;
  }

  selectDeck(deckId: number) {
    this.decksService.setSelectDeckId(deckId);
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  closeJoindreModal() {
    this.showModal = false;

    this.serviceMatch.leaveMatch();
  }

  openCreateDeckPage() {
    this.router.navigate(['/create-deck']);
  }

  openMagasinPage() {
    this.router.navigate(['/magasin']);
  }

  openStatistiquePage() {
    this.router.navigate(['/stats']);
  }
}
