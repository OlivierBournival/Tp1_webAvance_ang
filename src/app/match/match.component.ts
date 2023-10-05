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
  constructor(public serviceMatch: MatchServiceService) { }


  public update: Events = new Events('' , 0,0, [])
  public startMatch: StartMatch | null = new StartMatch(' ', [])
  mycards: Card[] = [];
  enemycards: Card[] = [];

  ngOnInit() {
    this.serviceMatch.StartMatch()

    setInterval(() => {
      this.UpdateMatch();
    }, 5000);
  }

  async UpdateMatch() {
      this.startMatch = await this.serviceMatch.UpdateMatch()
      if (this.startMatch != null)
      {
    if(this.startMatch.$type == "StartMatch")
    {
      for(let i =0; i< this.startMatch.Events.length; i++)
      {
        console.log(this.startMatch.Events[i].PlayerId)
        console.log(this.startMatch.Events[i])
        console.log(i)
        if(localStorage.getItem('PlayerId') == this.startMatch.Events[i].PlayerId.toString())
        {
          this.mycards.push(await this.serviceMatch.Getcard(this.startMatch.Events[i].PlayableCardId))
        }
        else
        {
          this.enemycards.push(await this.serviceMatch.Getcard(this.startMatch.Events[i].PlayableCardId))
        }
      }
    }
  }
}

  async PlayCard() {
    console.log(this.serviceMatch.UpdateMatch());
  }
}
