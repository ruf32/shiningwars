import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tropaIN } from 'src/app/interfaces/tropaIN';
import { front } from 'src/app/services/get-icon.service';
import { StoreService, solicitud } from 'src/app/services/store.service';
import * as uuid from 'uuid';
@Component({
  selector: 'app-popup2',
  templateUrl: './popup2.component.html',
  styleUrls: ['./popup2.component.css']
})
export class Popup2Component {
  public solicitud:solicitud[]
  public activas:tropaIN[]
  public BP:number
  public time=60
  snapwar:solicitud[]=[]
  constructor(
    private sto:StoreService,
    public dialogref:MatDialogRef<Popup2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rout:Router
    ){

this.solicitud=this.data.solicitud
this.activas=this.data.activas 
this.BP=this.data.bp  
  }
 
  ngOnInit(): void {
    this.sto.snapsol1(localStorage.getItem('email') as string).subscribe(data=>this.snapwar=data)
setInterval(()=>{if(this.snapwar.length>0){ localStorage.setItem('docwar',this.snapwar[0].battle!);this.dialogref.close('WARR');this.rout.navigate(['game'])}},1000)
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
  this.sto.changuesol(this.sto.getsolbyID(item.id as string),{Estado:'WAR',Acept1:true,Acept2:true})
this.sto.Initwar2(this.activas,this.solicitud[0].battle!,localStorage.getItem('email') as string )
}
}

