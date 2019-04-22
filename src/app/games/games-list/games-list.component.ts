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

  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit() {
    this.gameService.getGames();
    this.gameSub = this.gameService.getGameUpdateListener()
      .subscribe((gameData: { games: Game[] }) => {
        this.games = gameData.games;
        
      });

      this.userIsAuth = this.authService.getIsAuth();
      this.gameSub = this.authService.getAuthStatusListener()
      .subscribe(isAuth => {
        this.userIsAuth = isAuth;
        
      })
  }

  onDelete(gameId: String){
    this.gameService.deleteGame(gameId);
    this.gameService.getGames();
  }

  
}