import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CharachterService } from '../charachter.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-charachter-create',
  templateUrl: './charachter-create.component.html',
  styleUrls: ['./charachter-create.component.css']
})
export class CharachterCreateComponent implements OnInit {
  CharachterForm: FormGroup;
  gameid: string;
  userIsAuth = false;
  subscription: Subscription;

  constructor(private charachterService: CharachterService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.gameid = params.gameid);
    this.CharachterForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required)
    });

    this.userIsAuth = this.authService.getIsAuth();

  }

  createCharachter(gameid: string) {
    this.charachterService.createCharachter(gameid, this.CharachterForm.value);
  }
}