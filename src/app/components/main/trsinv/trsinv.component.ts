import { Component, Input } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { tropaIN } from 'src/app/interfaces/tropaIN';
import { front } from 'src/app/services/get-icon.service';
import { StoreService,  } from 'src/app/services/store.service';


@Component({
  selector: 'app-trsinv',
  templateUrl: './trsinv.component.html',
  styleUrls: ['./trsinv.component.css']
})
export class TRSInvComponent {
@Input() tropa!:tropaIN
constructor(private sto:StoreService){}
geticon(option:string):string{
  return front[option as keyof typeof front]
  }
  desequipar(Item:string,tipo:string){
    var accion=''
    let val:DocumentReference
    const mail=localStorage.getItem('email') as string;
    const DocID=localStorage.getItem('doc') as string;
    //coger documentos
    const doctropa=this.sto.getdocbyID(this.tropa!.id,mail,DocID,'tropas')
    this.sto.getequipID(this.tropa.id,Item).then(value=>{
      if (value) {val=this.sto.getdocbyID(value,mail,DocID,'equipo')
      this.sto.setdocByID(val,doctropa,Item,tipo,'desequipar')

      this.dequipartropa(Item,tipo)
    }}).catch(error=>console.log(error))
    //alterar tropa
    
    
    
   
  }
  dequipartropa(item:string,tipo:string){
    switch(tipo){
      case 'Arma':
        this.tropa!.Arma='noArma';break;
      case 'Armadura':
        this.tropa!.Armadura='noArmadura';break;
      case 'Item':
        let valueremove:string|undefined=item
        this.tropa.Item=this.tropa!.Item=this.tropa!.Item.filter(value=>{
          if (value==valueremove){
            valueremove=undefined
            return false
          }
          else return true
        });break;
     default:
     valueremove=item
      this.tropa.Skill.filter(value=>{
        if (value==valueremove){
          valueremove=undefined
          return false
        }
        else return true
      });break;
    }
  }
}
