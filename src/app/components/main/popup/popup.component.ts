import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tropaIN } from 'src/app/interfaces/tropaIN';

import { GetIconService, front } from 'src/app/services/get-icon.service';
import { StoreService, solicitud } from 'src/app/services/store.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{
 player='rafame097@gmail.com'
  time=60
  mostrar=true
 activa:tropaIN[]=[]
 snapwar:solicitud[]=[]
public playerON:any =false
public solicitud:solicitud
  constructor(private sto:StoreService,
    public dialogref:MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
   private rout:Router
    ){

this.solicitud=this.data.solcicitud as solicitud
this.sto.getactivetroops().subscribe(data=>this.activa=data)

  }
 
  ngOnInit(): void {
    this.sto.snapsol3(localStorage.getItem('email') as string).subscribe(data=>this.snapwar=data)
    setInterval(()=>{if(this.snapwar.length>0){this.dialogref.close('Warr');this.rout.navigate(['game'])}},1000)
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
    const clave=this.sto.clave().substring(3)
    
    this.sto.changuesol(this.sto.getsolbyID(item.id as string),{Estado:'Aceptado',Acept2:true,Acept1:false,},clave)
    this.time=65;
    
       const data1={
        jugador1:item.Solicitante,jugador2:item.Solicitante,mapa:item.mapa
        }
        localStorage.setItem('docwar',clave)
        this.sto.Initwar1(this.activa,data1,clave,localStorage.getItem('email')as string)
     
    
  }
}
