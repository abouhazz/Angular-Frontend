import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuth = false;
  private authStatusSub: Subscription;
  private token;
  private user;
  private name;

  constructor(private authService: AuthService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenicater => {
        this.userIsAuth = isAuthenicater;
      })
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}