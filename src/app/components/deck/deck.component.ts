import { Component, Input, OnInit } from '@angular/core';
import { Deck } from 'src/app/models/Deck';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
})
export class DeckComponent implements OnInit {
  @Input() show: string = 'front';
  @Input() deck?: Deck;
  beautifulBackUrl =
    'https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg';

  constructor() {}

  ngOnInit() {}
}
