import { Component, OnInit } from '@angular/core';
import { Card, CardMagasin } from '../models/Card';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MagasinService } from '../services/magasin.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Effect } from '../models/Effect';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit {
  cards: CardMagasin[] = [];
  effects: Effect[] = [];
  showModal = false;
  errorMessage: string = '';
  domain: string = environment.apiUrl
  cardsDailySelection : CardMagasin[] = [];
  cardsWeeklySelection : CardMagasin[] = [];
  cardOffreMoment: CardMagasin =  new CardMagasin(1,"stev",1,1,"ee",false,1,1,1,"w") ;

  constructor(
    public http: HttpClient,
    public serviceMagasin: MagasinService,
    public router: Router
  ) {}

  async ngOnInit() {
    this.effects  = await this.serviceMagasin.getEffects()
    console.log(this.effects)
    //this.cardOffreMoment = await this.serviceMagasin.getcardsCurrentOffer();
    this.cardsDailySelection= await this.serviceMagasin.getcardsDailySelection();
    

    //make a foreach for this.cardsDailySelection, each .effetId  wich is not null should make .effect corespond to effects wit the same id
    this.cardsDailySelection.forEach((card) => {
      if (card.effetId !== null) {
        const matchingEffect = this.effects.find((effect) => effect.id === card.effetId);
        if (matchingEffect) {
          card.effet = matchingEffect;
        }
      }
    });
    console.log(this.cardsDailySelection)




    this.cardsWeeklySelection = await this.serviceMagasin.getcardsWeeklySelection();
    this.cardsWeeklySelection.forEach((card) => {
      if (card.effetId !== null) {
        const matchingEffect = this.effects.find((effect) => effect.id === card.effetId);
        if (matchingEffect) {
          card.effet = matchingEffect;
        }
      }
    });

    console.log('cardsBulk done'); 
    console.log(this.cardsWeeklySelection)
    console.log('dECK TEST')
    console.log(await this.serviceMagasin.getDecks())
    console.log(' TEST donne')



  }

  // get all the cards from the server
  
   
  


}
