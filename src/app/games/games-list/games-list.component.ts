import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from 'src/app/models/game.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  games: Game[] = [];
  gameSub: Subscription;
  userIsAuth = false;
  authStatusSub: Subscription;
  userId: string;

  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit() {
    this.gameService.getGames();
    this.userId = this.authService.getUserId();
    this.gameSub = this.gameService.getGameUpdateListener()
      .subscribe((gameData: { games: Game[] }) => {
        this.games = gameData.games;

      });

    this.userIsAuth = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();

  }

  onDelete(gameId: String) {
    console.log(gameId);
    return this.gameService.deleteGame(gameId);
    
  }


}