import { Component, OnInit } from '@angular/core';
import { tropa } from 'src/app/class/tropa';
import { fila } from 'src/app/interfaces/cell';
import { tropaIN } from 'src/app/interfaces/tropaIN';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
troopselected:tropaIN[]|null=null

board:fila[]=[]
tropas:tropaIN[]=[]
tropasP:tropaIN[]=[]
tropasOB:tropa[]=[]
turnos:string[]=[]

constructor(private sto:StoreService){
//tablero inicial mapa ID ='0'
//recepcion de datawar
//recepcion tropas
//trasformacion de tropas
//update tropas base de datos
//recepcion turno subturno en caso de carga
//Seleccion de fase de juego 
}
ngOnInit(): void {
this.sto
}
}
export interface datawar{
  jugador1:string
  jugador2:string
  turn:number
  subturn:number
  IDturn:string[]
}
