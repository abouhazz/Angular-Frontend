import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Charachter } from '../../models/charachter.model';
import { Subscription } from 'rxjs';
import { CharachterService } from '../charachter.service';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-charachter-update',
  templateUrl: './charachter-update.component.html',
  styleUrls: ['./charachter-update.component.css']
})
export class CharachtersUpdateComponent implements OnInit {
  charachter: Charachter;
  subscription: Subscription;
  updateCharachterForm: FormGroup;
  gameId: string;
  charachterId: string;
  userIsAuth = false;

  constructor(private charachterService: CharachterService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.updateCharachterForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required),
    });

    this.route.params.subscribe(params => this.gameId = params.gameid);
    this.route.params.subscribe(params => this.charachterId = params.charachterid);

    this.charachterService.getCharachterById(this.gameId, this.charachterId);
    this.subscription = this.charachterService.getDeveloperByIdUpdateListener()
      .subscribe((charachterData: { charachter: Charachter }) => {
        this.charachter = charachterData.charachter;
      });

    this.userIsAuth = this.authService.getIsAuth();

  }

  updateCharachter(gameId: string, charachterId: string) {
    this.charachterService.updateCharachter(gameId, charachterId, this.updateCharachterForm.value);

  }
}