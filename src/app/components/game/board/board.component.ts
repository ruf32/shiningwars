import { Component, OnInit } from '@angular/core';
import { StoreService, } from 'src/app/services/store.service';
import{back, casilla }from '../../../objetos/Board';
import{tropagame }from '../../../objetos/tropas'
import { fila ,cell} from 'src/app/interfaces/cell';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  tablero:fila[]=[]
  fila:cell[]=[]
  tropas1:tropagame[]=[]
  tropas2:tropagame[]=[]
 
  alltropas:tropagame[]=[]
  carpeta:string=localStorage.getItem('map') as string
constructor(private sto:StoreService){
this.sto.gettabwar(localStorage.getItem('docwar')as string).subscribe(data=>{
  //recepcion de tablero
  this.tablero=data;
  //ordenar tablero
  this.tablero=this.tablero.sort((a,b)=>{return a.id-b.id});
this.tablero.map(element=>element.cell.map(elem=>{elem.id='0';elem.player='0'}))
  })


}
  ngOnInit(): void {
    //this.gettropas(localStorage.getItem('email') as string).subscribe(data=>{
      //data.forEach(element=>this.tropas1.push(new tropagame(element,1)))
   // })
  }
  gettropas(player:string){
 return this.sto.getropaswar(player,localStorage.getItem('war') as string)
  }

searchbyId(tropaId:string){
  return this.alltropas.find(element=>{element.getID()==tropaId}) 
}
getIcon(back1:string){
    return back[back1 as keyof typeof back]
} 
marcarcelda(x:number,y:number){
  console.log(x+''+y)
}
}
