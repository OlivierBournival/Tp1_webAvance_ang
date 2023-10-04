import { Component, OnInit } from '@angular/core';
import { MatchServiceService } from '../services/matchService.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
})
export class MatchComponent implements OnInit {
  constructor(public serviceMatch: MatchServiceService) { }

  mycards: any = [];
  enemycards: any = [];

  ngOnInit() {
    this.serviceMatch.StartMatch()

    let card = {
      name: 'Jedi Chat',
      attack: 2,
      defense: 10,
      imageUrl:
        'https://images.squarespace-cdn.com/content/51b3dc8ee4b051b96ceb10de/1394662654865-JKOZ7ZFF39247VYDTGG9/hilarious-jedi-cats-fight-video-preview.jpg?content-type=image%2Fjpeg',
    };
    for (let i = 0; i < 4; i++) {
      this.mycards.push(card);
      this.enemycards.push(card);
    }

    setInterval(() => {
      this.UpdateMatch();
    }, 10000);
  }

  async UpdateMatch() {
    this.serviceMatch.UpdateMatch();
  }

  async PlayCard() {
    console.log(this.serviceMatch.UpdateMatch());
  }
}
