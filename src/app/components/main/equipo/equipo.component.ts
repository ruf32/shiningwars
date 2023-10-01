import { Component, Input, OnInit } from '@angular/core';
import { tropaIN } from 'src/app/interfaces/tropaIN';
import { GetIconService, front } from 'src/app/services/get-icon.service';
import { StoreService, items,  } from 'src/app/services/store.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit{
  @Input() tropa!:tropaIN|null
items:items[]=[]
currentItemTooltip:any;
constructor(private sto:StoreService,private ic:GetIconService){

}
ngOnInit(): void {
  this.sto.getitems().subscribe(data=>this.items=data)
}
geticon(option:string):string{
  return front[option as keyof typeof front]
  }
//funciones tooltip(info de objetos) 
onMouseEnterLeave(item: any, isEnter: boolean): void {
  if (isEnter)this.currentItemTooltip = item;
  else this.currentItemTooltip = null;
  
  }
showTooltipForItem(item: any): boolean {
  return this.currentItemTooltip === item;
  }
  //funciones booleanas para botones
  ifarma(){
if (this.tropa!.Arma!='noArma') return false
else return true
  }
  ifarmadura(){
    if (this.tropa!.Armadura!='noArmadura') return false
    else return true
  }
  ifinventario(){
    if (this.tropa!.Item.length<4) return true
    else return false
  }
  equipar(item:items){
    var accion=''
    const mail=localStorage.getItem('email') as string;
    const DocID=localStorage.getItem('doc') as string;
    //coger documentos
    const doctropa=this.sto.getdocbyID(this.tropa!.id,mail,DocID,'tropas')
    const docItem=this.sto.getdocbyID(item.id!,mail,DocID,'equipo')
    //alterar tropa
    if (item.equipada=='0') accion='equipar' 
    
    else accion='desequipar'
    this.sto.setdocByID(docItem,doctropa,item.nombre,item.tipo,accion)
    this.equipartropa(item)
    
  }

  equipartropa(item:items){
    switch(item.tipo){
      case 'Arma':
        this.tropa!.Arma=item.nombre;break;
      case 'Armadura':
        this.tropa!.Armadura=item.nombre;break;
      case 'Item':
        this.tropa!.Item.push(item.nombre)
    }
  }
}
