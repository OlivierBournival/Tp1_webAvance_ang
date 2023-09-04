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

  catcard = {
    name: "Jedi Chat",
    attack: 2,
    defense: 10,
    imageUrl:"https://images.squarespace-cdn.com/content/51b3dc8ee4b051b96ceb10de/1394662654865-JKOZ7ZFF39247VYDTGG9/hilarious-jedi-cats-fight-video-preview.jpg?content-type=image%2Fjpeg"
  } // attack : number, public defense : number, public ImageUrl? : string | null){
  cards : Card [] =[
    {id: 1, name: 'scout', attack : 4,defense: 4 , imageUrl :'https://neural.love/cdn/ai-photostock/1eddfa43-6780-663c-947a-1d35f0d44870/0.jpg?Expires=1698796799&Signature=soKyPQf1CooT5ZIMqtzdMLiN51pbxifuOBqOmiMhFVAMPQJaR2i4trQgQKngTnpGLhZVqD2iUISD4nnRa0kr8i5F8xlZ9fOm1hpIlncTlUZNpHCdhgQHvoJCleurKoWgKKeuTbkngqBoBVLyJ14Tk3s4c20uqs7CscadNjOcog-EjzdxAXNg9wUOK1NGuPMwKQ7fTgEMBs2XSeN9-XDkItz65fg-KHcN-i0-RTyGjRZSD5inmz1h5RMhkONXgaWU-yRh3pb5hvsJVb2Z2MYIluQVHaEqaeLFoKw1wqxRfW077sOEe9FkiFZgV5BSAWGXJE4neun9yJlYdn48h7HgZw__&Key-Pair-Id=K2RFTOXRBNSROX' },
   
];

  constructor(public http : HttpClient) { }


  async ngOnInit() {
    
    this.cards == await this.getcards()
  } 
  // get all the card of  player.id 
  async getcards(): Promise<Card[]> {
    console.log("objet card atendu : ");  
    let x = await lastValueFrom(this.http.get<Array<Card>>('https://localhost:7219/api/card/getallcards')); // this string is to be changed 
    
    console.log(x);  
    let cardss : Card [] = []
    for(let i = 0; i < x.length; i++){
      cardss.push(new Card (x[i].id, x[i].name ,x[i].attack,x[i].defense,x[i].imageUrl));
    }
    return cardss;
    }

  
}