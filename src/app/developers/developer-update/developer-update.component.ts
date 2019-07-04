import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Developer } from '../../models/developer.model';
import { Subscription } from 'rxjs';
import { DeveloperService } from '../developer.service';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-developer-update',
  templateUrl: './developer-update.component.html',
  styleUrls: ['./developer-update.component.css']
})
export class DevelopersUpdateComponent implements OnInit {
  developer: Developer;
  subscription: Subscription;
  updateDeveloperForm: FormGroup;
  gameId: string;
  developerId: string;
  userIsAuth = false;

  constructor(private developerService: DeveloperService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.updateDeveloperForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.route.params.subscribe(params => this.gameId = params.gameid);
    this.route.params.subscribe(params => this.developerId = params.developerid);

    this.developerService.getDeveloperById(this.gameId, this.developerId);
    this.subscription = this.developerService.getDeveloperByIdUpdateListener()
      .subscribe((developerData: { developer: Developer }) => {
        this.developer = developerData.developer;
      });

    this.userIsAuth = this.authService.getIsAuth();
    
  }

  updateDeveloper(gameId: string, developerId: string) {
    this.developerService.updateDeveloper(gameId, developerId, this.updateDeveloperForm.value);

  }
}