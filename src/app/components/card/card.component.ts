import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() show: string = 'front';
  @Input() health: number = 0;
  @Input() defense: number = 0;
  @Input() attack: number = 0;
  @Input() name: string = '';
  @Input() imageUrl: string = '';
  beautifulBackUrl =
    'https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg';

  constructor() {}

  ngOnInit() {}
}
