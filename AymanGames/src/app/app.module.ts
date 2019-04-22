import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { LoginComponent } from './auth/login/login.component';
import {SignupComponent}from './auth/register/register.component';
import {GamesListComponent}from './games/games-list/games-list.component'
import {CreateGameComponent}from'./games/game-create/games.create.component'
import {GamesDetailComponent} from './games/game-detail/games-detail.component'
import{ UpdateGameComponent} from './games/game-update/games-update.component'
import {DeveloperCreateComponent} from './developers/developer-create/developer-create.component'
import { DevelopersListComponent } from './developers/developer-list/developer-list.component';
import{DevelopersUpdateComponent} from'./developers/developer-update/developer-update.component'
import {HeaderComponent} from './header/header.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatPaginatorModule,
  MatDialogModule
} from '@angular/material';
import { from } from 'rxjs';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    GamesListComponent,
    CreateGameComponent,
    GamesDetailComponent,
    UpdateGameComponent,
    DeveloperCreateComponent,
    DevelopersListComponent,
    DevelopersUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }