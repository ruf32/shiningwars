import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { front } from 'src/app/services/get-icon.service';
import { StoreService, tropas } from 'src/app/services/store.service';

@Component({
  selector: 'app-tropas',
  templateUrl: './tropas.component.html',
  styleUrls: ['./tropas.component.css']
})
export class TropasComponent implements OnInit{
  tropas:tropas[]=[]
  currentItemTooltip:any;
  constructor(private sto:StoreService){

  }
  ngOnInit(): void {
    this.sto.getropas().subscribe(data=>this.tropas=data)
  }
  @Output() tropaselect =new EventEmitter<tropas>
 
  emision(tropa:tropas){
    this.tropaselect.emit(tropa)
  }
  //funcion iconos
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
}
