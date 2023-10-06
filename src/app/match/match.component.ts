import { Component, OnInit } from '@angular/core';
import { MatchServiceService } from '../services/matchService.service';
import { Events, StartMatch } from '../models/events';
import { Card } from '../models/Card';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
})
export class MatchComponent implements OnInit {
  public update: Events = new Events('' , 0,0, [])
  public startMatch: Events[] | null = []
  mycards: Card[] = [];
  enemycards: Card[] = [];
  playerHealthPercentage: number = 100;
  enemyHealthPercentage: number = 100;

  constructor(public serviceMatch: MatchServiceService) { }

  ngOnInit() {
    this.serviceMatch.StartMatch()

    setInterval(() => {
      this.UpdateMatch();
    }, 5000);
  }

  async PlayCard(card:Card) {
    this.serviceMatch.PlayCard(card.id);

  }

  async UpdateMatch() {
      this.startMatch = await this.serviceMatch.UpdateMatch()
      console.log(this.startMatch)
      if (this.startMatch != null) //Si le match n'est pas update il se passe rien
      {
   for(let i = 0;i< this.startMatch.length; i++)
   {
    if(this.startMatch[i].$type == "StartMatch") //On regarde ce que c'est comme event pour ensuite adapter le jeu a la situation
    {
      for(let i =0; i< this.startMatch[i].Events.length; i++)
      {
        console.log(this.startMatch[i].Events[i].PlayerId)
        console.log(this.startMatch[i].Events[i])
        console.log(i)
        if(this.serviceMatch.playerID == this.startMatch[i].Events[i].PlayerId) //On regarde le playerID pour savoir quel carte va a qui
        {
          this.mycards.push(await this.serviceMatch.Getcard(this.startMatch[i].Events[i].PlayableCardId))
        }
        else
        {
          this.enemycards.push(await this.serviceMatch.Getcard(this.startMatch[i].Events[i].PlayableCardId))
        }
      }
    }
    else if(false) // Autre event a rajouter ici , remplacer le "false" par le prochain event
    {

    }
  }     
  }
}

}
