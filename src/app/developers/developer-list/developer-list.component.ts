import { Component, OnInit, Input } from '@angular/core';
import { Developer } from '../../models/developer.model';
import { Subscription } from 'rxjs';
import { DeveloperService } from '../developer.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.css']
})
export class DevelopersListComponent implements OnInit {
  userIsAuth = false;
  Id: string;
  developers: Developer[] = [];
  subscription: Subscription;
  @Input()game: any;

  constructor(private developerService: DeveloperService, private route: ActivatedRoute, private authService: AuthService) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.Id = params.gameid);
    
    this.developerService.getDevelopers(this.Id);
    this.subscription = this.developerService.getDeveloperUpdateListener()
      .subscribe((developerData: { developers: Developer[] }) => {
        this.developers = developerData.developers;
      });
      
      this.userIsAuth = this.authService.getIsAuth();
      this.subscription = this.authService.getAuthStatusListener()
        .subscribe(isAuth => {
          this.userIsAuth = isAuth;
          
        })

      
  }

  deleteDeveloper(Id: string, developerId: string) {
    this.developerService.deleteDeveloper(Id, developerId)
    this.developerService.getDevelopers(Id);
  }
}