import { AfterViewInit, Component,ElementRef,Input, OnInit, ViewChild } from '@angular/core';
import { Database, onValue, query, ref ,set} from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
email=localStorage.getItem('email') as string  
chats:any
jug:string[]=[]
jugador:number=1;
lastline:string=''
msg=''
  chat=localStorage.getItem('chatID') as string
constructor( private db:Database,private rout:Router){}


  ngOnInit(): void {
    const msg=ref(this.db,'/CHATS/'+this.chat+'/msgs')
    this.jug[0]=localStorage.getItem('jug1') as string
    this.jug[1]=localStorage.getItem('jug2') as string
    if (this.jug[1]==localStorage.getItem('email')) this.jugador=2
onValue(msg,(snap)=>{
  const  ch=Object.values(snap.val());
  this.chats=ch.reverse();
  
  this.lastline=this.chats.length as string;;}

)
    
    
    
}


setalling(jug:number){
  if (jug==1) return "right"
  else return "left"
}
goback(){
  this.rout.navigate(['/battle'])
}

chatsend(){
  
  const refer=ref(this.db,`/CHATS/${localStorage.getItem('chatID') as string}/msgs/${this.lastline}`)
  set(refer,{jug:this.jugador,msg:this.msg})
  this.msg=''
  
}
}
