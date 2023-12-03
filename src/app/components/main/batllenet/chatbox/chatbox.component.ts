import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component,ElementRef,Input, OnInit, ViewChild } from '@angular/core';
import { Database, onValue, query, ref ,set} from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent  {
  chatselect:string|undefined

constructor( private db:Database,private rout:Router,private http:HttpClient){}


 selectchat(chat:string){
  this.chatselect=undefined
  this.chatselect=chat
 }
setalling(jug:number){
  if (jug==1) return "right"
  else return "left"
}
newmsg(msg:string){

}
goback(){
  this.rout.navigate(['/battle'])
}


}
