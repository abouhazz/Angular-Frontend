import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
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

    constructor(private gameService: GameService, private route: ActivatedRoute){
        this.GameForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            platform: new FormControl(null, Validators.required)   
        })
    }
    ngOnInit(){
    this.route.params.subscribe((params) => this.gameId = params.gameid);
    this.gameService.getGameById(this.gameId)
    this.gameSub = this.gameService.getGameByIdUpdateListener()
    .subscribe((gameData: { game: Game }) => {
        this.game = gameData.game;
      });
    
    }

    updateGame(gameid: String){
    this.gameService.updateGame(this.gameId, this.GameForm.value)
    }

    
}