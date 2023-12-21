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
  @Input() selected: boolean = false; // Add this line
  beautifulBackUrl =
  'https://as1.ftcdn.net/v2/jpg/05/91/92/94/1000_F_591929438_cthL2q8AjXe9aj6BKp4cz0hoOlZvl7Td.jpg'; // 'https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg';

  constructor() {}

  ngOnInit() {}
}
