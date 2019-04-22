import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
  }

  onSignup(form: NgForm) {
    
      this.isLoading = true;
      this.authService.createUser(form.value.email, form.value.name, form.value.password);
    
  }

  ngOnDestroy() {
    
  }
}