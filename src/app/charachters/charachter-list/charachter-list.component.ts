import { Component, OnInit, Input } from '@angular/core';
import { Charachter } from '../../models/charachter.model';
import { Subscription } from 'rxjs';
import { CharachterService } from '../charachter.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-charachter-list',
  templateUrl: './charachter-list.component.html',
  styleUrls: ['./charachter-list.component.css']
})
export class CharachterListComponent implements OnInit {

  Id: string;
  charachters: Charachter[] = [];
  subscription: Subscription;
  userIsAuth = false;
  authStatusSub: Subscription;
  userId: string;
  @Input() game: any;

  constructor(private charachterService: CharachterService, private route: ActivatedRoute, private authService: AuthService) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.Id = params.gameid);

    this.charachterService.getCharachters(this.Id);
    this.subscription = this.charachterService.getCharachterUpdateListener()
      .subscribe((charachterData: { charachters: Charachter[] }) => {
        this.charachters = charachterData.charachters;
      });

    this.userIsAuth = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();

  }

  deleteCharachter(Id: string, charachterId: string) {
    this.charachterService.deleteCharachter(Id, charachterId)
  }
}