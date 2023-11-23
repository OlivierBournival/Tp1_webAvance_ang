import { Component, Input, OnInit } from '@angular/core';
import { Effect } from '../models/Effect';



@Component({
  selector: 'app-cardMagasin',
  templateUrl: './cardmagasin.component.html',
  styleUrls: ['./cardmagasin.component.css'],
  
})
export class CardMagasinComponent implements OnInit {

  
  @Input() show: string = 'front';
    @Input() health: number = 0;
    @Input() defense: number = 0;
    @Input() attack = 0;
    @Input() name = '';
    @Input() imageUrl = '';
    @Input() price = 0;
    @Input() rarity = 0;
    @Input() mana = 0;
    @Input() description = '';
    @Input() effet: Effect = new Effect(0, '', '', '');
    
  scale= false;

  beautifulBackUrl =
    'https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg';

  constructor() {}

  ngOnInit() {}
 


}
