import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Game } from '../../models/game.model';

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
  authStatusSub: Subscription;
  userId: string;

  constructor(private gameService: GameService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => this.gameId = params.gameid);
    this.gameService.getGameById(this.gameId)
    this.gameSub = this.gameService.getGameByIdUpdateListener()
      .subscribe((gameData: { game: Game }) => {
        this.game = gameData.game;
      });

    this.userIsAuth = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();

  }

  onDelete(gameId: String) {
    this.gameService.deleteGame(gameId);
    this.gameService.getGames();
  }
}