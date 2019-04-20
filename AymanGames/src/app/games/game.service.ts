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

  export class GameService{
    apiUrl = environment.apiUrl;
    private games: Game[]=[];
    
    private gamesUpdated = new Subject<{games : Game[]}>();


    constructor(private http: HttpClient, private router: Router) { }

    getGameUpdateListener(){
        return this.gamesUpdated.asObservable();
    }
    getGames(){
        this.http.get<any>(`${this.apiUrl}api/games`)
        .subscribe((response) => {
            this.games = response;
            this.gamesUpdated.next({games:[...this.games]})
         });

    }

  }