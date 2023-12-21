import { Component, Input, OnInit } from '@angular/core';
import { Deck } from 'src/app/models/Deck';

@Component({
  selector: 'app-deckmagasin',
  templateUrl: './deckmagasin.component.html',
  styleUrls: ['./deckmagasin.component.css'],
})
export class DeckMagasinComponent implements OnInit {

  @Input() show: string = 'front';
  @Input() deck?: Deck;
  
  scale = false;
  // Assuming 'effet' is initialized as null initially
  showDescription = false;

  beautifulBackUrl = 'https://as1.ftcdn.net/v2/jpg/05/91/92/94/1000_F_591929438_cthL2q8AjXe9aj6BKp4cz0hoOlZvl7Td.jpg';

  constructor() {}

  ngOnInit() {}

  onMouseEnter() {
    this.scale = true;
  }

  onMouseLeave() {
    this.scale = false;
  }
}


