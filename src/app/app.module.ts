import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{MatDialogModule} from '@angular/material/dialog';
import{HttpClientModule} from '@angular/common/http'
//modulos firebase
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
//components primarios
import { LogComponent } from './components/log/log.component';
import { MainComponent } from './components/main/main.component';
import { BoardComponent } from './components/game/board/board.component';
//componentes secundarios
import { SobresComponent } from './components/main/sobres/sobres.component';
import { TropasComponent } from './components/main/tropas/tropas.component';
import { EquipoComponent } from './components/main/equipo/equipo.component';
import { SkillsComponent } from './components/main/skills/skills.component';
import { ActivasComponent } from './components/main/activas/activas.component';
import { SolicitudesComponent } from './components/main/solicitudes/solicitudes.component';
import { TRSInfoComponent } from './components/main/trsinfo/trsinfo.component';
import { TRSInvComponent } from './components/main/trsinv/trsinv.component';
import { TurnosComponent } from './components/game/turnos/turnos.component';
import { HeadComponent } from './components/main/head/head.component';
import { PopupComponent } from './components/main/popup/popup.component';
import { Popup2Component } from './components/popup2/popup2.component';
import { BatllenetComponent } from './components/main/batllenet/batllenet.component';
import { ChatboxComponent } from './components/main/batllenet/chatbox/chatbox.component';
import { HelpComponent } from './components/main/help/help.component';
import { Poup3Component } from './components/main/poup3/poup3.component';
import { GameComponent } from './components/game/game.component';
import { ChatindexComponent } from './components/main/chatbox/chatindex/chatindex.component';
import { ChatmsgComponent } from './components/main/chatbox/chatmsg/chatmsg.component';


@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    MainComponent,
    SobresComponent,
    TropasComponent,
    EquipoComponent,
    SkillsComponent,
    ActivasComponent,
    SolicitudesComponent,
    TRSInfoComponent,
    TRSInvComponent,
    BoardComponent,
    TurnosComponent,
    HeadComponent,
    PopupComponent,
    Popup2Component,
    BatllenetComponent,
    ChatboxComponent,
    HelpComponent,
    Poup3Component,
    GameComponent,
    ChatindexComponent,
    ChatmsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
