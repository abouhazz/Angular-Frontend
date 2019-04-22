import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from '../../models/game.model';
import { AuthService } from '../../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-games-update',
  templateUrl: './games-update.component.html',
  styleUrls: ['./games-update.component.css']
})

export class UpdateGameComponent implements OnInit{
    game: Game;
    gameSub: Subscription;
    gameId: string;
    GameForm : FormGroup;
    userIsAuth = false;

    constructor(private gameService: GameService, private route: ActivatedRoute, private authService: AuthService){
       
    }
    ngOnInit(){
    this.GameForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        platform: new FormControl(null, Validators.required)   
    })

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

    updateGame(gameid: String){
    this.gameService.updateGame(this.gameId, this.GameForm.value)
    }

    
}