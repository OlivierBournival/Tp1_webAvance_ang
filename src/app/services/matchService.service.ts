import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { Match } from '../models/Match';
import { JoiningMatchData } from '../models/JoiningMatchData';
import { StartMatch, Events } from '../models/events';

const domain = 'https://localhost:7219/';

@Injectable({
  providedIn: 'root',
})
export class MatchServiceService {

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

  async UpdateMatch(): Promise<void> {
    const match = this.getMatch();

    let turnindex = 0;
    try {
      const response = await lastValueFrom(this.http.get<string>(domain + 'api/Match/UpdateMatch/' + match.id + '/' + turnindex));
      

      // Utilisez JSON.parse pour désérialiser la chaîne JSON en objet JavaScript
      const jsonObject = JSON.parse(response) as StartMatch;
      
    
      console.log(jsonObject)

      // Vous pouvez accéder au $type et aux Events ici

      console.log(jsonObject.$type)
      console.log(jsonObject.Events)
    } catch (error) {
      // Gérez les erreurs ici
      throw error;
    }
  }

  getMatch(): Match {
    return JSON.parse(localStorage.getItem('match') + '');
  }
}
