import { Component, OnInit } from '@angular/core';
import { Card } from '../model/Card';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  cards : Card [] =[];

  constructor(public http : HttpClient) { }

  async ngOnInit() {
    
   await this.getcards()
  } 
  // get all the card of  player.id 
  async getcards() {
    console.log("objet card atendu : ");  
    let x = await lastValueFrom(this.http.get<Array<Card>>('https://localhost:7219/api/card/getallcards')); // this string is to be changed 
    
    console.log(x);  
    let cardss : Card [] = []
    for(let i = 0; i < x.length; i++){
      cardss.push(new Card (x[i].id, x[i].name ,x[i].attack,x[i].defense,x[i].imageUrl));
    }
    console.log("objet card atendu : "+cardss[9].imageUrl);  
    this.cards = cardss;
    }

}