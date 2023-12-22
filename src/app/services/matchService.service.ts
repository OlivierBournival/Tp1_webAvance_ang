import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { Match } from '../models/Match';
import { JoiningMatchData } from '../models/JoiningMatchData';
import { StartMatch, Events } from '../models/events';
import { Card } from '../models/Card';
import { environment } from 'src/environments/environment.development';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { Router } from '@angular/router';

const domain = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MatchServiceService {
  private hubConnection: any;
  playerID: number | null =
    localStorage.getItem('playerID') == null
      ? null
      : parseInt(localStorage.getItem('playerID')!);
  turnindex: number = 0;
  match: Match | null = localStorage.getItem('match') == null ? null : JSON.parse(localStorage.getItem('match')!);
  enemyEmail: string | null = localStorage.getItem('enemyEmail') == null ? null : localStorage.getItem('enemyEmail');

  constructor(
    public authentificationService: AuthentificationService,
    public http: HttpClient,
    private router: Router
  ) {
    // 
    // SignalR
    //
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7219/gameplayHub')
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Hub connection started'))
      .catch((err: any) =>
        console.log('Error while starting hub connection: ' + err)
      );

    // MatchJoined
    this.hubConnection.on('MatchJoined', (data: any) => {
      console.log(data);

      if (data == null) {
        return;
      }

      // Vérification pour savoir quel joueur on est.
      const isA = data.playerA.name == this.authentificationService.email;
      const isB = data.playerB.name == this.authentificationService.email;

      // Vérificiation si on est bien dans la partie
      if (!isA && !isB) {
        console.error('You are not in this match');
        return;
      }

      // localStorage
      // set match
      this.setMatch(data.match);
      // set playerID
      this.setPlayerID(isA ? data.playerA.id : data.playerB.id);
      // set enemyEmail
      this.setEnemyEmail(isA ? data.playerB.name : data.playerA.name);

      console.log('Joined match id : ' + data.match.id);

      // Rediriger vers la page de match
      this.router.navigate(['/match']);
    });

    // MatchEnd
    this.hubConnection.on('MatchEnd', (data: any) => {
      console.log(data);

      // remove match
      this.setMatch(null);
      // remove playerID
      this.setPlayerID(null);
      // remove enemyEmail
      this.setEnemyEmail(null);

      console.log('Match ended !');

      // Rediriger vers la page principale
      this.router.navigate(['/']);
    });
  }

  // 
  // Méthodes
  //

  // Méthode qui s'occupe de la création du match et qui initalise le match et tous les composants dont on va avoir besoin.
  async joinMatch(): Promise<boolean> {
    console.log('Joining match...');

    // get la data depuis le hub signalR
    const data = await this.hubConnection.invoke(
      'JoinMatch',
      this.authentificationService.userID
    );

    console.log(data);

    return true;
  }

  // Methode qui permet de quitter le match
  async leaveMatch(): Promise<boolean> {
    if (this.match == null) {
      throw Error('Match is null, impossible to leave...');
    }

    console.log('Leaving match... id : ' + this.match.id);

    // get la data depuis le hub signalR
    const data = await this.hubConnection.invoke(
      'Leave',
      this.match.id
    );

    console.log(data);

    return true;
  }

  //TODO : Permet de jouer une carte
  async playCard(idcard: Number): Promise<void> {

    if (this.match == null) {
      throw Error('Match is null');
    }

    let x = await lastValueFrom(
      this.http.post<any>(
        domain + 'api/Match/PlayCard/' + this.match.id + '/' + idcard,
        null
      )
    );
    console.log(x);
  }

  // Permet de récupérer une carte spécific
  async getCard(id: number): Promise<Card> {
    let x = await lastValueFrom(
      this.http.get<Card>(domain + 'api/card/GetCard/' + id)
    );

    return x;
  }


  ///
  /// LocalStorage
  ///
  setMatch(match: Match | null) {
    this.match = match;

    if (match == null) {
      localStorage.removeItem('match');
      return;
    }

    localStorage.setItem('match', JSON.stringify(match));
  }

  setPlayerID(id: number | null) {
    this.playerID = id;

    if (id == null) {
      localStorage.removeItem('playerID');
      return;
    }

    localStorage.setItem('playerID', id + '');
  }

  setEnemyEmail(email: string | null) {
    this.enemyEmail = email;

    if (email == null) {
      localStorage.removeItem('enemyEmail');
      return;
    }

    localStorage.setItem('enemyEmail', email);
  }
}
