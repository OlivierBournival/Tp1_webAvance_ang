import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/Card';
import { CardsService } from 'src/app/services/cards.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-create-deck-page',
  templateUrl: './create-deck-page.component.html'
})
export class CreateDeckPageComponent implements OnInit {
  cards: Card[] = [];
  selectedCardIds: number[] = [];
  errorMessage: string = '';
  domain: string = environment.apiUrl;
  deckForm: FormGroup;

  constructor(
    public http: HttpClient,
    public cardsService: CardsService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.deckForm = this.formBuilder.group({
      deckName: '',
    });
  }

  async ngOnInit() {
    this.cards = await this.cardsService.getCardsFromPlayer();
  }

  toggleCardSelection(cardId: number) {
    const index = this.selectedCardIds.indexOf(cardId);
    if (index === -1) {
      this.selectedCardIds.push(cardId);
    } else {
      this.selectedCardIds.splice(index, 1);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  createDeck() {
    // Implement the logic to create the deck with selectedCardIds and deckName
    console.log('Selected Card IDs:', this.selectedCardIds);
    console.log('Deck Name:', this.deckForm.value.deckName);
    // Add your HTTP request or other logic here
  }
}
