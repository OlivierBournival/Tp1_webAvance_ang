import { Component, Input, OnInit } from '@angular/core';
import { Effect } from '../../models/Effect';
import { MagasinService } from 'src/app/services/magasin.service';



@Component({
  selector: 'app-cardMagasin',
  templateUrl: './cardmagasin.component.html',
  styleUrls: ['./cardmagasin.component.css'],
  
})
export class CardMagasinComponent implements OnInit {

  
  @Input() show: string = 'front';
    @Input() idcard: number =0;
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
  // Assuming 'effet' is initialized as null initially
  showDescription = false;

  beautifulBackUrl =
    'https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg';

  constructor(public serviceMagasin: MagasinService) {}


  ngOnInit() {
    console.log(this.idcard)

  }
  
  async addCard() {
    this.serviceMagasin.payement(this.idcard)
  }

  onMouseEnter() {
    this.scale = true;
  }

  // Method to deactivate scale on mouse leave
  onMouseLeave() {
    this.scale = false;
  }
 


}

