import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { Deck } from '../models/Deck';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DecksService {
  domain: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async getDecksFromPlayer(): Promise<Deck[]> {
    console.log('getHomeDecks...');

    try {
      const decks: Deck[] = await lastValueFrom(
        this.http.get<Array<Deck>>(this.domain + 'api/deck/GetDecksFromPlayer')
      );

      console.log(decks);
      console.log('getHomeDecks done');

      return decks;
    } catch (error) {
      console.error(error);
    }

    return [];
  }

  createDeck(deck: any): Observable<any> {
    return this.http.post(`${this.domain}api/deck/CreateDeck`, deck);
  }

  removeCardFromDeck(IdDeck: number, IdCard: number): Observable<any> {
    const data = { IdDeck, IdCard };
    return this.http.post(this.domain + 'api/deck/RemoveCardDeck', data);
  }

  deleteDeck(IdDeck: number): Observable<any> {
    return this.http.post(this.domain + 'api/deck/DeleteDeck', { IdDeck });
  }

  getDeckDetails(deckId: number): Promise<Deck> {
    return lastValueFrom(
      this.http.get<Deck>(`${this.domain}api/deck/GetDeckDetails/${deckId}`)
    );
  }

  addCardToDeck(deckId: number, cardId: number): Observable<any> {
    const data = { IdDeck: deckId, IdCard: cardId };
    return this.http.post(this.domain + 'api/deck/AddCardDeck', data);
  }

}
