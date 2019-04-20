import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-games-create',
  templateUrl: './games-create.component.html',
  styleUrls: ['./games-create.component.css']
})

export class CreateGameComponent implements OnInit{

    GameForm : FormGroup;

    constructor(private gameService: GameService){
        this.GameForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            platform: new FormControl(null, Validators.required)   
        })
    }
    ngOnInit(){
        this.gameService.createGame(this.GameForm.value)
    }

    
}