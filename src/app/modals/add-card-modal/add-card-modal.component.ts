// add-card-modal.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DecksService } from 'src/app/services/decks.service';
import { Card } from 'src/app/models/Card';
import { AddCardsDTO } from 'src/app/DTO/AddCardsDTO';

@Component({
  selector: 'app-add-card-modal',
  templateUrl: './add-card-modal.component.html',
})
export class AddCardModalComponent implements OnInit {
  availableCards: Card[] = [];
  selectedCardIds: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCardModalComponent>,
    private decksService: DecksService,
    @Inject(MAT_DIALOG_DATA) public data: { deckId: number } // Inject deckId
  ) {}

  ngOnInit() {
    this.loadAvailableCards();
  }

  async loadAvailableCards() {
    const deckId = this.data.deckId; // Use the passed deckId
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
    console.log('Adding cards:', this.selectedCardIds);

    const addCardsDTO: AddCardsDTO = {
      IdDeck: this.data.deckId,
      IdCards: this.selectedCardIds,
    };

    this.decksService.addCardsToDeck(addCardsDTO).subscribe(
      (response) => {
        console.log('Card added successfully', response);
        // Optionally, you may want to perform additional actions after adding each card
      },
      (error) => {
        console.error('Error adding card', error);
        // Handle error if needed
      }
    );

    this.close();
  }
}
