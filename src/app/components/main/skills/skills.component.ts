import { Component, OnInit } from '@angular/core';
import { front } from 'src/app/services/get-icon.service';
import { StoreService, skill } from 'src/app/services/store.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit{
  skills:skill[]=[]
  currentItemTooltip:any
  constructor(private sto:StoreService){

  }
  ngOnInit(): void {
    this.sto.getSkills().subscribe(data=>this.skills=data)
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
