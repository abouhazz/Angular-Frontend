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
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private token: string;
  private userId: string;




  constructor(private http: HttpClient, private router: Router) { }


  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, name: string, password: string) {
    const authData: AuthData = { email: email, name: name, password: password };

    this.http.post(`${this.apiUrl}api/register`, authData)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email: email, name: undefined, password: password };
    this.http.post<any>(
      `${this.apiUrl}api/login`, authData
    )
      .subscribe((response) => {
        const NewToken = response.token;
        const UiD = response.userId;
        this.token = NewToken;
        this.userId = UiD;
        localStorage.setItem('token', this.token)
        localStorage.setItem('userId', this.userId);


        this.authStatusListener.next(true);
        this.isAuthenticated = true;

        this.router.navigate(['gamelist']);



      }, (error) => { });


  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['login']);
  }



}