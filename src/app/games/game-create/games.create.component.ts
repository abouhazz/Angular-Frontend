import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-games-create',
  templateUrl: './games-create.component.html',
  styleUrls: ['./games-create.component.css']
})

export class CreateGameComponent implements OnInit{
    GameForm : FormGroup;
    gameSub: Subscription;
    userIsAuth = false;

    constructor(private gameService: GameService, private authService: AuthService){}
    
    ngOnInit(){
        this.GameForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            platform: new FormControl(null, Validators.required)   
        })
        
        this.userIsAuth = this.authService.getIsAuth();
        this.gameSub = this.authService.getAuthStatusListener()
        .subscribe(isAuth => {
        this.userIsAuth = isAuth;
        
      })
    }

    createGame() {
        this.gameService.createGame(this.GameForm.value)
        this.gameService.getGames();
    }

}