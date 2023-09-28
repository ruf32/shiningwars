import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
 
public playerON:any =false
public solicitud:solicitud
  constructor(private sto:StoreService,
    public dialogref:MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
   
    ){
const solicitud1=this.data as solicitud
this.solicitud=solicitud1
    
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
    this.sto.changuesol(this.sto.getsolbyID(item.id as string),{Estado:'Aceptado',Acept2:true,Acept1:true})
    this.time=65;
  }
}
