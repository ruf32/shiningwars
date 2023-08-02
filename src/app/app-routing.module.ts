import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {canActivate,redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { MytroopsComponent } from './components/mytroops/mytroops.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BattleComponent } from './components/battle/battle.component';
import { BoardComponent } from './components/board/board.component';
const routes: Routes = [
{path : '',pathMatch:'full',redirectTo:'/login'},
{path:'mytroops',component :MytroopsComponent,...canActivate(()=>redirectUnauthorizedTo(['/login']))},
{path:'register',component:RegisterComponent},
{path:'login',component:LoginComponent},
{path:'BattleSearch',component:BattleComponent},
{path:'board',component:BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
