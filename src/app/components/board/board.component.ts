import { Component, OnInit } from '@angular/core';
import { cell,backs } from '../interfaces/inter';
import { FireService } from 'src/app/services/fire.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  tablero:cell[][]=[]
  fila:cell[]=[]
 carpeta:string
  posx:number=0
  posy:number=0
  backs1= backs
  tablerosel:cell={
    back: "tierra",
    collision: false,
    id: 0 }
  constructor(private fire:FireService){
    this.carpeta=localStorage.getItem('board') as string
    this.tablero=this.gettablero()
  }
  ngOnInit(): void {

  }
  compararimg(img:keyof typeof backs):boolean{
    if (img==this.tablerosel.back) return false
    else return true
  }
  Creartablero():void{
 this.fila=[]
    for(let x=0;x<20;x++){
      for(let y=0;y<20;y++){
       
     
      this.fila.push({back:'hierba',id:0,collision:false})
      }
      this.tablero.push(this.fila);
      this.fire.addboard(this.fila,x,this.carpeta)
      this.fila=[];
    console.log('fila ' ,x)
    }

    
}
marcarcelda(x:number,y:number){
this.posx=x;
this.posy=y;
this.tablerosel=this.tablero[this.posx][this.posy]
}
llamarcell(key:string){
 const key1=key as keyof typeof backs
 this.cambiarcell(key1)

}
cambiarcell(back3:keyof typeof backs){
var colli=false;
console.log(back3)
if ((back3=='agua')||(back3=='arbol')||(back3=='rock')) {colli=true}

this.tablero[this.posx][this.posy]={id:this.tablerosel.id,collision:colli,back:back3 }
console.log(this.tablero[this.posx][this.posy])
}
getImagenPath(back: keyof typeof backs): string {
  if(back!=undefined){
  return backs[back];}
  else return backs['tierra']
} 
guardartab(){
  this.fila=[]
  for(let x=0;x<20;x++){
    for(let y=0;y<20;y++){ 
this.fila.push(this.tablero[x][y])
} 
this.fire.addboard(this.fila,x,this.carpeta)
this.fila=[];

}
}
cargartab(){
  this.tablero=this.gettablero()
}
gettablero(){
  const tab:cell[][]=[]
      for(let x=0;x<20;x++){
        
        this.fire.getfilas(x,this.carpeta).then((data)=>{
tab.push(data)
        }).catch((error)=>{
          console.log(error)
        })
      }
 return  tab
}}
