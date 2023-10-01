import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService,  solicitud, } from 'src/app/services/store.service';
import { cell, fila } from 'src/app/interfaces/cell';
import { MatDialog } from '@angular/material/dialog';
import { Popup2Component } from '../popup2/popup2.component';
import { casilla } from 'src/app/objetos/Board';
import { tropagame } from 'src/app/objetos/tropas';
import { tropaIN } from 'src/app/interfaces/tropaIN';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  troopselected:tropaIN|null=null
  Paritda=false;
  PopOpen=true;
  changuesolicitado:any=undefined
  public solicAcept:solicitud[]=[]
  public activas:tropaIN[]=[]
  public BP:number=0
  constructor(private sto:StoreService,private rout:Router ,private diag:MatDialog){

  }
  ngOnInit(): void {
    this.sto.getactivetroops().subscribe(data=>{
      this.activas=data
    this.BP=this.getpointbattles()})
this.sto.snapsol2(localStorage.getItem('email')as string).subscribe(data=>this.solicAcept=data)
 setInterval(()=>{
  if(this.solicAcept.length>0&&this.PopOpen) this.Openpopup()
 },3000)

  }
troopSel(tropa:tropaIN){
  this.troopselected=tropa

}
getpointbattles():number{
  var sum=0;
  if (this.activas.length>0){for(let x of this.activas){
  sum+=x.BP;
  }}
  return sum;
}
navigation(){
  if (this.Paritda==true) this.rout.navigate(['/game'])
}
chattrue(){
 return localStorage.getItem('chatID')? true:false
}
Openpopup(){
  this.PopOpen=false
  const dialogRef = this.diag.open(Popup2Component, {
    width: '400px',
    height: 'auto',
    disableClose: true,
    data:{
      solicitud:this.solicAcept,
      activas:this.activas,
      bp:this.BP}
   
  });

  dialogRef.afterClosed().subscribe((result: string) => {
    console.log('El popup se cerró.'+result);
    if (result=='fin de cuenta atras'){this.PopOpen=true
      
      this.solicAcept.forEach(element=>this.sto.changuesol(this.sto.getsolbyID(element.id as string ),{Estado:'Pendiente',Acept1:false,Acept2:false}))
    }else{
      //copiar tablero base
let tabBase:fila[]=[]
this.sto.gettabbase(localStorage.getItem('map') as string).subscribe(data=>{tabBase=data;tabBase=tabBase.sort((a,b)=>{return a.id-b.id});tabBase.forEach(element=>{
element.cell.forEach(ele=>ele.player='0')
})})
//crear idlucha
const ID=this.sto.clave()
//crear tablero 
tabBase.forEach((element,index)=>{
  this.sto.creartab(ID,element.cell,index)
})
//tranformar tropas


const tropasdata:tropagame[]=[]
this.activas.forEach(element=>{
tropasdata.push(new tropagame(element,"2"))
})
tropasdata.forEach(element=>{
  this.sto.enviartropa(element.DataExport,localStorage.getItem('email')as string,ID)
})
    }
  });
}
gochat(){
  this.rout.navigate(['/battle'])
}
opensobre(tipo:string){
  
}
}
