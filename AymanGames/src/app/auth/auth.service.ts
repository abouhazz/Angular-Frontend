import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private isUserLoggedIn;

  constructor(private http: HttpClient, private router: Router) { }

  
  getAuthStatusListener() {
    return this.authStatusListener;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  createUser(email: string, name: string, password: string) {
    const authData: AuthData = { email: email, name: name, password: password};

    return this.http.post(`${this.apiUrl}api/users/register`, authData)
      .subscribe(() => {
        this.router.navigate(['login']);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  loginUser(email: string,  password: string) {
    const authData: AuthData = { email: email, name:undefined, password: password};
    this.http.post<{ message: string, token: string, expiresIn: number, user: any }>(
      `${this.apiUrl}api/users/login`, authData
      )
      .subscribe((response) => {
        localStorage.setItem('token', response.toString())
        this.token = response.token;
        if (this.token) {
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      }
      );
  }


  logout() {
    localStorage.removeItem('token');
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    
    
    this.router.navigate(['/']);
  }

}