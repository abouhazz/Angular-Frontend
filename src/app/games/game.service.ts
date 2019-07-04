import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Game } from '../models/game.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  apiUrl = environment.apiUrl;
  private games: Game[] = [];
  private game: Game;
  private gameUpdated = new Subject<{ game: Game }>();
  private gamesUpdated = new Subject<{ games: Game[] }>();


  constructor(private http: HttpClient, private router: Router) { }

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  getGames() {
    this.http.get<any>(`${this.apiUrl}api/games`)
      .subscribe((response) => {
        this.games = response;
        this.gamesUpdated.next({ games: [...this.games] })
      });

  }

  createGame(game: Game) {
    this.http.post<any>(`${this.apiUrl}api/games`, game)
      .subscribe((response) => {
        this.router.navigate(['gamelist'])
      });
  }

  getGameById(gameId: String) {
    this.http.get<any>(`${this.apiUrl}api/games/` + gameId)
      .subscribe((response) => {
        this.game = response;
        this.gameUpdated.next({ game: { ...this.game } })
      });
  }

  updateGame(gameId: string, game: Game) {
    this.http.put<any>(`${this.apiUrl}api/games/` + gameId, game)
      .subscribe((response) => {
        this.router.navigate(['gamelist']);
      });
  }

  deleteGame(gameId: String) {
    this.http.delete<any>(`${this.apiUrl}api/games/` + gameId)
      .subscribe((response) => {
        this.getGames();
      });
  }

  getGameByIdUpdateListener() {
    return this.gameUpdated.asObservable();
  }


}