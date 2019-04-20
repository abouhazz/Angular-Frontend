import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => this.gameId = params.gameid);
    this.gameService.getGameById(this.gameId)
    this.gameSub = this.gameService.getGameByIdUpdateListener()
    .subscribe((gameData: { game: Game }) => {
        this.game = gameData.game;
      });
  }

  onDelete(gameId: String){
    this.gameService.deleteGame(this.gameId);
  }
}