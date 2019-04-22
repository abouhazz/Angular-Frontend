import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeveloperService } from '../developer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-developer-create',
    templateUrl: './developer-create.component.html',
    styleUrls: ['./developer-create.component.css']
  })
  export class DeveloperCreateComponent implements OnInit {
    DeveloperForm: FormGroup;
    gameid: string;
  
    constructor(private developerService: DeveloperService, private route: ActivatedRoute) { 
      
    this.route.params.subscribe(params => this.gameid = params.gameid);
      this.DeveloperForm = new FormGroup({
        name: new FormControl(null, Validators.required)
      });
    }
  
    ngOnInit() {
    }
  
    createDeveloper(gameid: string) {
        this.developerService.createDeveloper(gameid, this.DeveloperForm.value);
    }
  }