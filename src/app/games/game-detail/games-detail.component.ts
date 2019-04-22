import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.css']
})
export class GamesDetailComponent implements OnInit {
  game: Game;
  gameSub: Subscription;
  gameId: string;
  userIsAuth = false;

  constructor(private gameService: GameService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => this.gameId = params.gameid);
    this.gameService.getGameById(this.gameId)
    this.gameSub = this.gameService.getGameByIdUpdateListener()
    .subscribe((gameData: { game: Game }) => {
        this.game = gameData.game;
      });

    this.userIsAuth = this.authService.getIsAuth();
    this.gameSub = this.authService.getAuthStatusListener()
      .subscribe(isAuth => {
        this.userIsAuth = isAuth;
        
      })
  }

  onDelete(gameId: String){
    this.gameService.deleteGame(gameId);
    this.gameService.getGameById(gameId);
  }
}