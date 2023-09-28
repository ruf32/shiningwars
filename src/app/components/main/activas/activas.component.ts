import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { front } from 'src/app/services/get-icon.service';
import { StoreService, tropas } from 'src/app/services/store.service';

@Component({
  selector: 'app-activas',
  templateUrl: './activas.component.html',
  styleUrls: ['./activas.component.css']
})
export class ActivasComponent implements OnInit{
  activas:tropas[]=[]
  currentItemTooltip:any
  BP=0;
   @Output() tropaselect =new EventEmitter<tropas>
  @Input() tropasactivas!:tropas[]
  
  constructor(private sto:StoreService){

  }
  ngOnInit(): void {
  
  console.log(this.tropasactivas!)
    
  }
  emision(tropa:tropas){
    this.tropaselect.emit(tropa)
  }
  getpointbattles():number{
    var sum=0;
    if (this.tropasactivas.length>0){for(let x of this.tropasactivas){
     
    sum+=x.BattlePoints;
    }}
  
    return sum;
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
}
