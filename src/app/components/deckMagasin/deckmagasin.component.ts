import { Component, Input, OnInit } from '@angular/core';

import { MagasinService } from 'src/app/services/magasin.service';



@Component({
  selector: 'app-deckMagasin',
  templateUrl: './deckmagasin.component.html',
  styleUrls: ['./deckmagasin.component.css'],
  
})
export class deckMagasinComponent implements OnInit {

  
  @Input() show: string = 'front';
    @Input() name = '';
    @Input() price = ' ';
    @Input() description = '';
    
  scale= false;
  // Assuming 'effet' is initialized as null initially
  showDescription = false;

  beautifulBackUrl =
    'https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg';

  constructor(public serviceMagasin: MagasinService) {}


  ngOnInit() {}
  
  async addCard() {

    this.serviceMagasin.payementDeck(this.name)
  }

  onMouseEnter() {
    this.scale = true;
  }

  // Method to deactivate scale on mouse leave
  onMouseLeave() {
    this.scale = false;
  }
 


}

