import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/register/register.component';
import {GamesListComponent}from './games/games-list/games-list.component'
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'gamelist', component: GamesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }