import { Component, OnInit } from '@angular/core';
import { FirebaseApp, firebaseApp$ } from '@angular/fire/app';
import { Database, equalTo, onValue, query, ref ,orderByChild, set} from '@angular/fire/database';
import { Router } from '@angular/router';
import { StoreService, Users } from 'src/app/services/store.service';

@Component({
  selector: 'app-batllenet',
  templateUrl: './batllenet.component.html',
  styleUrls: ['./batllenet.component.css']
})
export class BatllenetComponent implements OnInit {
  chats:any
  users:Users[]=[]
  batle:Users[]=[]
  
  useractivo!:Users
  constructor(private db:Database,private sto:StoreService,private rout:Router){

  }
  haschat(mail:string){
    if (this.useractivo!.chats.length>0)return this.useractivo.chatsp.some((element)=>element==mail)
    else return false
  }
  chattrue(){
    return localStorage.getItem('chatID')? true:false
   }
  createchat(email:string){
    
    const claveformat =this.sto.clave()
    const refer=ref(this.db,'/CHATS/'+claveformat)
    set(refer,{data:{jug1:localStorage.getItem('email') as string,jug2:email},msgs:{0:{jug:1,msg:'hola'}}}).then(res=>console.log('fase database'))

    this.sto.setchat(localStorage.getItem('email') as string,email,claveformat).then(res=>console.log('fase firebase'))
  }
  ngOnInit(): void {
    this.sto.getUsers().subscribe(data=>{this.users=data; 
      if (this.users){
        
     this.useractivo=this.users.find((element)=>element.email==localStorage.getItem('email')) as Users
     if (!this.useractivo.chats){
      this.useractivo.chats=[]
      this.useractivo.chatsp=[]
      this.useractivo.chatsj=[]
     }
    
    }
    
      })

};



setchat(index:number){

localStorage.setItem('chatID',this.useractivo.chats[index])
if (this.useractivo.chatsj[index]=='jug1' ){
localStorage.setItem('jug1',localStorage.getItem('email') as string)
localStorage.setItem('jug2',this.useractivo.chatsp[index])}
else{
  localStorage.setItem('jug2',localStorage.getItem('email') as string)
  localStorage.setItem('jug1',this.useractivo.chatsp[index])}

}
setalling(jug:number){
  if (jug==1) return "right"
  else return "left"
}
finduser(user:Users){
  return user.email==localStorage.getItem('email')
}
}
