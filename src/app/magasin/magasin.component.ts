import { Component, OnInit } from '@angular/core';
import { Card, CardMagasin } from '../models/Card';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MagasinService } from '../services/magasin.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit {
  cards: CardMagasin[] = [];
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
    //this.cardOffreMoment = await this.serviceMagasin.getcardsCurrentOffer();
    this.cardsDailySelection = await this.serviceMagasin.getcardsDailySelection();




    this.cardsWeeklySelection = await this.serviceMagasin.getcardsWeeklySelection();

    console.log('cardsBulk done'); 

  }

  // get all the cards from the server
  


}
