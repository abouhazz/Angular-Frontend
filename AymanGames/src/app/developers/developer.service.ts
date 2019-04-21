import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Developer } from '../models/developer.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class DeveloperService{
    apiUrl = environment.apiUrl;
    private developers: Developer[]=[];
    private developer: Developer;
    private developerUpdated = new Subject<{ developer: Developer }>();
    private developersUpdated = new Subject<{developers : Developer[]}>();


    constructor(private http: HttpClient, private router: Router) { }

    getDeveloperUpdateListener(){
        return this.developersUpdated.asObservable();
    }

    getDevelopers(gameid: String){
        this.http.get<any>(`${this.apiUrl}api/games/`+ gameid+ '/developers')
        .subscribe((response) => {
            this.developers = response;
            this.developersUpdated.next({developers:[...this.developers]})
         });

    }

    createDeveloper(gameid : String, developer: Developer){
        this.http.post<any>(`${this.apiUrl}api/games/`+ gameid+ '/developers', developer)
      .subscribe((response) => {
          this.router.navigate(['gamedetail/'+ gameid])
      });
    }

    getDeveloperById(gameid: String, developerid: String){
        this.http.get<any>(`${this.apiUrl}api/games/` + gameid + '/developers/'+developerid)
            .subscribe((response) => {
            this.developer = response;
        this.developerUpdated.next({ developer: { ...this.developer } })
      });
    }

    updateDeveloper(gameid: String, developerid: String, developer: Developer) {
        this.http.put<any>(`${this.apiUrl}api/games/` + gameid + '/developers/'+developerid, developer)
          .subscribe((response) => {
            this.router.navigate(['gamedetail/'+ gameid]);
          });
      }

      deleteDeveloper(gameid: String, developerid: String){
        this.http.delete<any>(`${this.apiUrl}api/games/` + gameid + '/developers/'+developerid)
        .subscribe((response) => {
          this.router.navigate(['gamedetail/'+ gameid]);
        });
      }

    getDeveloperByIdUpdateListener() {
        return this.developerUpdated.asObservable();
      }


  }