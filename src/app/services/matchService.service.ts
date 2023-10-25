import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { Match } from '../models/Match';
import { JoiningMatchData } from '../models/JoiningMatchData';
import { StartMatch, Events } from '../models/events';
import { Card } from '../models/Card';
import { environment } from 'src/environments/environment.development';

const domain = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MatchServiceService {
  playerID: number | null = localStorage.getItem('playerID') == null ? null : parseInt(localStorage.getItem('playerID')!);

  turnindex:number = 0;
  constructor(
    public authentificationService: AuthentificationService,
    public http: HttpClient
    
  ) { }

  // Méthode qui s'occupe de la création du match et qui initalise le match et tous les composants dont on va avoir besoin.
  
  async joinMatch(): Promise<boolean> {
    console.log('Joining match...');

    const data: JoiningMatchData = await lastValueFrom(
      this.http.post<any>(domain + 'api/Match/JoinMatch', null)
    );

    console.log(data);
    
    if (data == null)
    {
      return false;
    }

    // Vérification pour savoir quel joueur on est.
    const isA = (data.playerA.name == this.authentificationService.email);
    const isB = (data.playerB.name == this.authentificationService.email);

    // Vérificiation si on est bien dans la partie
    if (!isA && !isB)
    {
      console.error('You are not in this match');
      return false;
    }

    // localStorage
    localStorage.setItem('match', JSON.stringify(data.match));
    this.setPlayerID(isA ? data.playerA.id : data.playerB.id);
    localStorage.setItem('enemyEmail', isA ? data.playerB.name : data.playerA.name);

    console.log('Joined match id : ' + data.match.id);
    return true;
  }

  // Permet de commencer la recherche de match (La méthode est appelé tant que la fenêtre de recherche est ouverte)
  async StartMatch(): Promise<void> {
    const match = this.getMatch();

    let x = await lastValueFrom(this.http.post<any>(domain + 'api/Match/StartMatch/' + match.id, null))

    console.log(x);
  }

  //TODO : Permet de jouer une carte
  async PlayCard(idcard: Number): Promise<void> {
    const match = this.getMatch();

    let x = await lastValueFrom(this.http.post<any>(domain + 'api/Match/PlayCard/' + match.id + '/' + idcard, null))
    console.log(x);
  }

  // Appeler tous les X temps pour update le match au niveau client [Méthode la plus importante!]
  async UpdateMatch(): Promise<StartMatch | null> {
    const match = this.getMatch();

    try {
      let response = await lastValueFrom(this.http.get<string>(domain + 'api/Match/UpdateMatch/' + match.id + '/' + this.turnindex));
      
     console.log(this.turnindex)
      console.log(response)
      if (response == null)
      {
        return null
      }

      //Désérialization du JSON que le serveur envoie
      const jsonObject = JSON.parse(response) as StartMatch;
      
      console.log(jsonObject)

      // Incrémentation de l'index pour que le serveur n'envoie pas la même action à nouveau.
      this.turnindex ++;
      return jsonObject
      
    } catch (error) {
      throw error;
    }
  }

  // Permet de récupérer une carte spécific
  async Getcard(id:number): Promise<Card>
  {
    let x = await lastValueFrom(this.http.get<Card>(domain + 'api/card/GetCard/' + id));

    return x
  }


  getMatch(): Match {
    return JSON.parse(localStorage.getItem('match') + '');
  }

  setPlayerID(id: number) {
    this.playerID = id;
    localStorage.setItem('playerID', id + '');
  }

  get enemyEmail(): string {
    return localStorage.getItem('enemyEmail') + '';
  }
}
