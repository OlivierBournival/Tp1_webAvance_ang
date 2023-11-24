import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/Card';
import { CardsService } from 'src/app/services/cards.service';
import { DecksService } from 'src/app/services/decks.service';
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
    public decksService: DecksService,
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
    if (this.deckForm.valid && this.selectedCardIds.length > 0) {
      const deck = {
        deckName: this.deckForm.value.deckName,
        cardIds: this.selectedCardIds
      };
  
      this.decksService.createDeck(deck).subscribe(
        () => {
          console.log('Deck created successfully');
          // Redirect or perform any other actions after successful deck creation
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error creating deck:', error);
          this.errorMessage = 'Error creating deck. Please try again.'; // Set the error message
        }
      );
    } else {
      console.warn('Invalid form or no cards selected');
      this.errorMessage = 'Invalid form or no cards selected.'; // Set the error message
    }
  }

  toggleSelectAll() {
    if (this.selectedCardIds.length === this.cards.length) {
      // If all cards are selected, clear the selection
      this.selectedCardIds = [];
    } else {
      // Otherwise, select all cards
      this.selectedCardIds = this.cards.map(card => card.id);
    }
  }
}
