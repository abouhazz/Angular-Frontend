import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Charachter } from '../models/charachter.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CharachterService {
  apiUrl = environment.apiUrl;
  private charachters: Charachter[] = [];
  private charachter: Charachter;
  private charachterUpdated = new Subject<{ charachter: Charachter }>();
  private charachtersUpdated = new Subject<{ charachters: Charachter[] }>();


  constructor(private http: HttpClient, private router: Router) { }

  getCharachterUpdateListener() {
    return this.charachtersUpdated.asObservable();
  }

  getCharachters(gameid: String) {
    this.http.get<any>(`${this.apiUrl}api/games/` + gameid + '/charachters')
      .subscribe((response) => {
        this.charachters = response;
        this.charachtersUpdated.next({ charachters: [...this.charachters] })
      });

  }

  createCharachter(gameid: String, charachter: Charachter) {
    this.http.post<any>(`${this.apiUrl}api/games/` + gameid + '/charachters', charachter)
      .subscribe((response) => {
        this.router.navigate(['gamedetail/' + gameid])
      });
  }

  getCharachterById(gameid: String, charachterid: String) {
    this.http.get<any>(`${this.apiUrl}api/games/` + gameid + '/charachters/' + charachterid)
      .subscribe((response) => {
        this.charachter = response;
        this.charachterUpdated.next({ charachter: { ...this.charachter } })
      });
  }

  updateCharachter(gameid: String, charachterid: String, charachter: Charachter) {
    this.http.put<any>(`${this.apiUrl}api/games/` + gameid + '/charachters/' + charachterid, charachter)
      .subscribe((response) => {
        this.router.navigate(['gamedetail/' + gameid]);
      });
  }

  deleteCharachter(gameid: String, charachterid: String) {
    this.http.delete<any>(`${this.apiUrl}api/games/` + gameid + '/charachters/' + charachterid)
      .subscribe((response) => {
        this.getCharachters(gameid);
      });
  }

  getDeveloperByIdUpdateListener() {
    return this.charachterUpdated.asObservable();
  }


}