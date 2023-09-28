import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { front } from 'src/app/services/get-icon.service';
import { StoreService, solicitud, tropas } from 'src/app/services/store.service';
import * as uuid from 'uuid';
@Component({
  selector: 'app-popup2',
  templateUrl: './popup2.component.html',
  styleUrls: ['./popup2.component.css']
})
export class Popup2Component {
  public solicitud:solicitud[]
  public activas:tropas[]
  public BP:number
  public time=60
  constructor(
    private sto:StoreService,
    public dialogref:MatDialogRef<Popup2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    ){

this.solicitud=this.data.solicitud
this.activas=this.data.activas 
this.BP=this.data.bp  
  }
 
  ngOnInit(): void {
   setInterval(()=>this.countdownd(),1000) 
   
  }
countdownd(){
  if (this.time>0) this.time--
else this.dialogref.close('fin de cuenta atras')

}
geticon(option:string):string{
  return front[option as keyof typeof front]
  }
Aceptar(item:solicitud){
  this.sto.changuesol(this.sto.getsolbyID(item.id as string),{Estado:'Aceptado',Acept1:true,Acept2:true})
this.Initwar(item)
}
Initwar(solicitud:solicitud){
//crear documento en carpeta war con los datos de la partida
const clave=uuid.v4()
    const claveformat =clave
    .replace(/-/g, '')
const datagame={
jugador1:solicitud.Solicitado,
jugador2:solicitud.Solicitante,
mapa:solicitud.mapa,

}
this.sto.adddocwar(claveformat,datagame)
//enviar tropas 2
//navegar board
}
}

