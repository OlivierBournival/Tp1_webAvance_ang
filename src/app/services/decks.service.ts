import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { Deck } from '../models/Deck';
import { Observable } from 'rxjs';
import { AddCardsDTO } from '../DTO/AddCardsDTO';
import { RemoveCardFromDeckDTO } from '../DTO/RemoveCardFromDeckDTO';

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

  removeCardFromDeck(IdDeck: number, IdCard: number) {
    const removeCardFromDeckDTO: RemoveCardFromDeckDTO = {
      IdDeck,
      IdCard,
    };

    console.log(removeCardFromDeckDTO);

    try {
      const response: any = lastValueFrom(
        this.http.post(
          this.domain + 'api/deck/RemoveCardDeck',
          removeCardFromDeckDTO
        )
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  deleteDeck(IdDeck: number): Observable<any> {
    return this.http.post(this.domain + 'api/deck/DeleteDeck', { IdDeck });
  }

  getDeckDetails(deckId: number): Promise<Deck> {
    return lastValueFrom(
      this.http.get<Deck>(`${this.domain}api/deck/GetDeckDetails/${deckId}`)
    );
  }

  getCardsNotInDeck(deckId: number): Promise<any> {
    return lastValueFrom(
      this.http.get<any>(`${this.domain}api/deck/GetCardsNotInDeck/${deckId}`)
    );
  }

  addCardsToDeck(addCardsDTO: AddCardsDTO): Observable<any> {
    return this.http.post(`${this.domain}api/deck/AddCardsToDeck`, addCardsDTO);
  }
}
