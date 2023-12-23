import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service';
import { Events, StartMatch } from '../models/events';
import { Card } from '../models/Card';
import { AuthentificationService } from '../services/authentification.service';
import { CardPile } from '../models/CardPile';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
})
export class MatchComponent implements OnInit {
  playerHealthPercentage: number = 100;
  enemyHealthPercentage: number = 100;
  mycards: CardPile[] = [];
  enemycards: CardPile[] = [];

  constructor(
    public matchService: MatchService,
    public authentificationService: AuthentificationService
  ) {}

  ngOnInit() {
    if (this.matchService.match == null) {
      this.matchService.joinMatch();
      return;
    }

    const isPlayerA: boolean = this.matchService.isPlayerA();

    if (isPlayerA) {
      this.mycards = this.matchService.match?.playerDataA.cardsPile;
      this.enemycards = this.matchService.match?.playerDataB.cardsPile;
    } else {
      this.mycards = this.matchService.match?.playerDataB.cardsPile;
      this.enemycards = this.matchService.match?.playerDataA.cardsPile;
    }

    this.playerHealthPercentage = this.matchService.match?.playerDataA.health;
    this.enemyHealthPercentage = this.matchService.match?.playerDataB.health;
  }

  async playCard(cardId: number) {
    this.matchService.playCard(cardId);
  }

  leaveMatch() {
    this.matchService.leaveMatch();
  }

  // async UpdateMatch() {
  //   this.startMatch = await this.serviceMatch.UpdateMatch();
  //   console.log(this.startMatch);
  //   if (this.startMatch != null) {
  //     //Si le match n'est pas update il se passe rien
  //     if (this.startMatch.$type == 'StartMatch') {
  //       //On regarde ce que c'est comme event pour ensuite adapter le jeu a la situation
  //       for (let i = 0; i < this.startMatch.Events.length; i++) {
  //         console.log(this.startMatch.Events[i].PlayerId);
  //         console.log(this.startMatch.Events[i]);
  //         console.log(i);
  //         if (
  //           this.serviceMatch.playerID == this.startMatch.Events[i].PlayerId
  //         ) {
  //           //On regarde le playerID pour savoir quel carte va a qui
  //           this.mycards.push(
  //             await this.serviceMatch.Getcard(
  //               this.startMatch.Events[i].PlayableCardId
  //             )
  //           );
  //         } else {
  //           this.enemycards.push(
  //             await this.serviceMatch.Getcard(
  //               this.startMatch.Events[i].PlayableCardId
  //             )
  //           );
  //         }
  //       }
  //     } else if (false) {
  //       // Autre event a rajouter ici , remplacer le "false" par le prochain event
  //     }
  //   }
  // }
}
