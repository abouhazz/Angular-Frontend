import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/register/register.component';
import { GamesListComponent } from './games/games-list/games-list.component'
import { CreateGameComponent } from './games/game-create/games.create.component'
import { GamesDetailComponent } from './games/game-detail/games-detail.component'
import { UpdateGameComponent } from './games/game-update/games-update.component'
import { DeveloperCreateComponent } from './developers/developer-create/developer-create.component'
import { DevelopersUpdateComponent } from './developers/developer-update/developer-update.component'
import { CharachterCreateComponent } from './charachters/charachter-create/charachter-create.component'
import { CharachtersUpdateComponent } from './charachters/charachter-update/charachter-update.component'
import { AuthGuard } from './auth/auth.guard';
import { from } from 'rxjs';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'gamelist', component: GamesListComponent, canActivate: [AuthGuard] },
  { path: 'gamecreate', component: CreateGameComponent, canActivate: [AuthGuard] },
  { path: 'gamedetail/:gameid', component: GamesDetailComponent, canActivate: [AuthGuard] },
  { path: 'gameedit/:gameid', component: UpdateGameComponent, canActivate: [AuthGuard] },
  { path: 'gamedetail/:gameid/developercreate', component: DeveloperCreateComponent, canActivate: [AuthGuard] },
  { path: 'gamedetail/:gameid/developerupdate/:developerid', component: DevelopersUpdateComponent, canActivate: [AuthGuard] },
  { path: 'gamedetail/:gameid/charachtercreate', component: CharachterCreateComponent, canActivate: [AuthGuard] },
  { path: 'gamedetail/:gameid/charachterupdate/:charachterid', component: CharachtersUpdateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }