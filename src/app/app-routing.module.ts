import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LogComponent } from './components/log/log.component';

import { ChatboxComponent } from './components/main/batllenet/chatbox/chatbox.component';
import { BatllenetComponent } from './components/main/batllenet/batllenet.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/login'},
  {path:'main',component:MainComponent},
  {path:'login',component:LogComponent},
  {path:'game',component:GameComponent},
  {path:'chat',component:ChatboxComponent},
  {path:'battle',component:BatllenetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
