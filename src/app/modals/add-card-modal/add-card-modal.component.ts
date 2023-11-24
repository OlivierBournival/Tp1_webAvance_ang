// add-card-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DecksService } from 'src/app/services/decks.service';
import { Card } from 'src/app/models/Card';

@Component({
  selector: 'app-add-card-modal',
  templateUrl: './add-card-modal.component.html',
})
export class AddCardModalComponent implements OnInit {
  availableCards: Card[] = [];
  selectedCardIds: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCardModalComponent>,
    private decksService: DecksService
  ) {}

  ngOnInit() {
    this.loadAvailableCards();
  }

  async loadAvailableCards() {
    const deckId = 1; // Replace with the actual deckId
    this.availableCards = await this.decksService.getCardsNotInDeck(deckId);
  }

  toggleCardSelection(cardId: number) {
    const index = this.selectedCardIds.indexOf(cardId);
    if (index === -1) {
      this.selectedCardIds.push(cardId);
    } else {
      this.selectedCardIds.splice(index, 1);
    }
  }

  close() {
    this.dialogRef.close();
  }

  addCard() {
    // Implement logic to add the selected cards to the deck
    const deckId = 1; // Replace with the actual deckId

    for (const selectedCardId of this.selectedCardIds) {
      this.decksService.addCardToDeck(deckId, selectedCardId).subscribe(
        () => {
          console.log('Card added successfully');
          // Optionally, you may want to perform additional actions after adding each card
        },
        (error) => {
          console.error('Error adding card', error);
          // Handle error if needed
        }
      );
    }

    this.close();
  }
}
