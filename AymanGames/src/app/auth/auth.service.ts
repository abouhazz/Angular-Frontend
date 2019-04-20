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
  
  
  

  constructor(private http: HttpClient, private router: Router) { }


  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener;
  }

  createUser(email: string, name: string, password: string) {
    const authData: AuthData = { email: email, name: name, password: password};

    this.http.post(`${this.apiUrl}api/register`, authData)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  loginUser(email: string,  password: string) {
    const authData: AuthData = { email: email, name:undefined, password: password};
    this.http.post<any>(
      `${this.apiUrl}api/login`, authData
      )    
      .subscribe((response) => {
        localStorage.setItem('token', response.toString())
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
        
        
        
      }
      );
  }


  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['login']);
    
  }

}