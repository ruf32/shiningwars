import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { items, skill, sobres, tropas,Icon } from '../interfaces/inter';
import { FireService } from 'src/app/services/fire.service';
import { Observable } from 'rxjs';
import { GetIconService } from 'src/app/services/get-icon.service';

@Component({
  selector: 'app-mytroops',
  templateUrl: './mytroops.component.html',
  styleUrls: ['./mytroops.component.css']
})
export class MytroopsComponent implements OnInit,OnChanges{
  Audioenable=true;
  audi=new Audio()
  sobres:sobres[]=[]
  tropas:tropas[]=[]
  items:items[]=[]
  skills:skill[]=[]
  troopSelected:tropas|undefined
  troopboo=false
  armaselect=false
  armaduraselect=false
  activas:tropas[]=[]
  itemsSelect=false;
  currentItemTooltip:any;
  skillselect=false
  active=false
  SKILLSELCTED:string[]=[]
  BP:number=0
  boar:string='board1'
  solicitud=false;
 
constructor(private fire:FireService,private rout:Router,private icon:GetIconService){}
ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
ngOnInit(): void {
this.getsobres().subscribe((data)=>{
  this.sobres=data})
this.gettropas().subscribe((data)=>{
  this.tropas=data})
this.getitems().subscribe((data)=>{
  this.items=data})
this.getskils().subscribe((data)=>{
  this.skills=data})
if (this.Audioenable){
  this.audi.src="../../assets/audio4.mp3"
  this.audi.loop=true;
  this.audi.play();}
  this.fire.getactivetroops().then((data)=>{
  this.activas=data;
  this.BP=  this.getpointbattles();}).catch((error)=>{
      console.log(error)
     })
}
async logOut(){
  this.audi.pause()
 await this.fire.changestatusoff()
  this.fire.logout().then((response)=>{
this.rout.navigate(['/login'])
  }).catch((error)=>{
    console.log(error)
  })
}
getsobres(){
 return this.fire.getSobres()
}
gettropas(){
return this.fire.getropas()
}
getitems(){
  return this.fire.getitems()
}
getskils(){
  return this.fire.getSkills()
}
gettroop(troop:tropas){
this.BP=this.getpointbattles()
  this.troopSelected=troop;
  this.troopboo=true;
  if((this.troopSelected.hasOwnProperty('SKILL1'))&&(this.troopSelected.SKILL1)) {
    this.SKILLSELCTED=this.troopSelected.SKILL1
    this.skillselect=true;
  }
if(this.troopSelected.ARMA) this.armaselect=true;
if(this.troopSelected.ARMADURA) this.armaduraselect=true
if(this.troopSelected.activa) this.active=true;else this.active=false
}
geticon(option:string):string{
return this.icon.geticon(option)
}
cambiarestado(troop:string,activa:boolean){
  if (activa) this.active=false;else this.active=true
  
  this.fire.changuetroopact(troop,activa).then((response)=>{
   }).catch((error)=>{
    console.log(error)})
  this.fire.getactivetroops().then((data)=>{
    this.activas=data;
    this.BP=  this.getpointbattles();
   }).catch((error)=>{
    console.log(error)})
}
getpointbattles():number{
  var sum=0;
  if (this.activas.length>0){for(let x of this.activas){
  sum+=x.BattlePoints;
  }}
  return sum;
}
onMouseEnterLeave(item: any, isEnter: boolean): void {
  if (isEnter) {
    this.currentItemTooltip = item;

  } else {
    this.currentItemTooltip = null;
  }
 
}
showTooltipForItem(item: any): boolean {
  return this.currentItemTooltip === item;
}
gobat(){
  this.audi.pause()
this.rout.navigate(['/BattleSearch'])
}
goboard(){
  if(this.boar=='')this.boar='board1'
  localStorage.setItem('board',this.boar)
  this.audi.pause()
this.rout.navigate(['/board'])
}
abrirpop(){
  this.solicitud=true;
}
cerrarpop(){
  this.solicitud=false
}
}
