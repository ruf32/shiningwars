import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http'
import{Database,ref,onValue}from '@angular/fire/database'
@Injectable({
  providedIn: 'root'
})
export class ChatdataService {

  constructor(private http:HttpClient,private db:Database) { }
  getallchats(chatsID:string){
   
     return this.http.get("https://strong-41d31-default-rtdb.europe-west1.firebasedatabase.app/CHATS/"+chatsID+'/msgs.json')
    
  }
  getchats2(idchat:string){

  }
}
