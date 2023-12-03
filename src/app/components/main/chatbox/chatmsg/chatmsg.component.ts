import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { Database, onValue, ref ,set} from '@angular/fire/database';

@Component({
  selector: 'app-chatmsg',
  templateUrl: './chatmsg.component.html',
  styleUrls: ['./chatmsg.component.css']
})
export class ChatmsgComponent implements OnChanges {
@Input() chatID!:string
chats:any
lastline:string=''
jug=0
mensaje=''
constructor(private data:Database){
  
}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['chatID']){
      this.setjug()
    const msg=ref(this.data,'/CHATS/'+this.chatID+'/msgs')
    onValue(msg,(snap)=>{
      const  ch=Object.values(snap.val());
      this.chats=ch.reverse();
      
      this.lastline=this.chats.length as string;;}
    
    )}

  }
  setjug(){
    const rf=ref(this.data,'/CHATS/'+this.chatID+'/data')
    onValue(rf,(snap)=>{
      const ob=(snap.val())
      console.log(ob)
      if(ob.jug1==localStorage.getItem('email')as string){
        this.jug=1 
      }else this.jug=2

      console.log('jugador '+this.jug)
    })
  }
  setmsg(msg:string){
    const rf=ref(this.data,'/CHATS/'+this.chatID+'/msgs')
    const obj={jug:this.jug,msg:msg}
    const ch=this.chats.reverse()
    ch.push(obj)
    console.log(this.chats)
    set(rf,ch).then(()=>this.mensaje='')

  }
  setalling(jug:number){
    if (jug==1) return "right"
    else return "left"
  }

}
