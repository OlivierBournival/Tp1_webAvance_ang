import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { Match } from '../models/Match';
import { JoiningMatchData } from '../models/JoiningMatchData';
import { StartMatch, Events } from '../models/events';
import { Card } from '../models/Card';

const domain = 'https://localhost:7219/';

@Injectable({
  providedIn: 'root',
})
export class MatchServiceService {

  turnindex:number = 0;
  constructor(
    public authentificationService: AuthentificationService,
    public http: HttpClient
    
  ) { }

  async joinMatch(): Promise<boolean> {
    console.log('Joining match...');

    const data: JoiningMatchData = await lastValueFrom(
      this.http.post<any>(domain + 'api/Match/JoinMatch', null)
    ).catch((error) => {
      console.error(error);
      return null;
    });

    console.log(data);
    
    if (data == null)
    {
      return false;
    }

    // localStorage
    localStorage.setItem('match', JSON.stringify(data.match));
    //A faire
    //TODO : Être capable de savoir quel est quel joueur dans les data du match. Le garder dans un local storage pour le réutiliser plus tard.
    localStorage.setItem('PlayerId', 'Todo')

    console.log('Joined match id : ' + data.match.id);
    return true;
  }

  async StartMatch(): Promise<void> {
    const match = this.getMatch();

    let x = await lastValueFrom(this.http.post<any>(domain + 'api/Match/StartMatch/' + match.id, null))
    console.log(x);
  }

  async PlayCard(idcard: Number): Promise<void> {
    const match = this.getMatch();

    let x = await lastValueFrom(this.http.post<any>(domain + 'api/Match/PlayCard/' + match.id + '/' + idcard, null))
    console.log(x);
  }

  async UpdateMatch(): Promise<StartMatch | null> {
    const match = this.getMatch();

    try {
      const response = await lastValueFrom(this.http.get<string>(domain + 'api/Match/UpdateMatch/' + match.id + '/' + this.turnindex));
      
      if (response == null)
      {
        return null
      }

      // Utilisez JSON.parse pour désérialiser la chaîne JSON en objet JavaScript
      const jsonObject = JSON.parse(response) as StartMatch;
      
    
      console.log(jsonObject)

      // Vous pouvez accéder au $type et aux Events ici

      console.log(jsonObject.$type)
      console.log(jsonObject.Events)

      this.turnindex ++;
      return jsonObject
    } catch (error) {
      // Gérez les erreurs ici
      throw error;
    }
  }

  async Getcard(id:number): Promise<Card>
  {
                                                  /*'https://localhost:7219/api/card/getallcards'*/
    let x = await lastValueFrom(this.http.get<Card>('https://localhost:7219/api/card/GetCard/' + id));

    return x
  }


  getMatch(): Match {
    return JSON.parse(localStorage.getItem('match') + '');
  }
}
