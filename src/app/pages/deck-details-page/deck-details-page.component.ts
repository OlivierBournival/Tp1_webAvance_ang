// deck-details-page.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCardModalComponent } from 'src/app/modals/add-card-modal/add-card-modal.component';
import { Deck } from 'src/app/models/Deck';
import { DecksService } from 'src/app/services/decks.service';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details-page.component.html',
  styleUrls: ['./deck-details-page.component.css'],
})
export class DeckDetailsComponent implements OnInit {
  deckId?: number;
  deck?: Deck;
  errorMessage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private decksService: DecksService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.deckId = +params['deckId'];
      this.deck = await this.decksService.getDeckDetails(this.deckId);
    });
  }

  async addCardToDeck(deckId: number, cardId: number) {
    await this.decksService.addCardToDeck(deckId, cardId);
    this.deck = await this.decksService.getDeckDetails(deckId); // Refresh deck details
  }

  async removeCardFromDeck(deckId: number, cardId: number) {
    await this.decksService.removeCardFromDeck(deckId, cardId);
    this.deck = await this.decksService.getDeckDetails(deckId); // Refresh deck details
  }

  goBack() {
    this.router.navigate(['/']); // Navigate back to the main page
  }

  addCard() {
    // Open the add card modal
    const dialogRef = this.dialog.open(AddCardModalComponent);
  
    // Subscribe to the afterClosed event to handle modal closure
    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result if needed
      console.log('The dialog was closed', result);
    });
  }
}
