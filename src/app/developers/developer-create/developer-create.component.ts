import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeveloperService } from '../developer.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-developer-create',
    templateUrl: './developer-create.component.html',
    styleUrls: ['./developer-create.component.css']
  })
  export class DeveloperCreateComponent implements OnInit {
    DeveloperForm: FormGroup;
    gameid: string;
    userIsAuth = false;
    subscription: Subscription;
  
    constructor(private developerService: DeveloperService, private route: ActivatedRoute, private authService: AuthService) { }

    ngOnInit() {
      this.route.params.subscribe(params => this.gameid = params.gameid);
      this.DeveloperForm = new FormGroup({
        name: new FormControl(null, Validators.required)
      });

      this.userIsAuth = this.authService.getIsAuth();
      this.subscription = this.authService.getAuthStatusListener()
        .subscribe(isAuth => {
          this.userIsAuth = isAuth;
          
        })
    }

    
    
    createDeveloper(gameid: string) {
        this.developerService.createDeveloper(gameid, this.DeveloperForm.value);
    }
  }