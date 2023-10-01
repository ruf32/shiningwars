import { Component, OnInit } from '@angular/core';
import{Database,ref,onValue}from '@angular/fire/database';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, formulario } from 'src/app/services/auth.service';
import { ChatdataService } from 'src/app/services/chatdata.service';
import { StoreService } from 'src/app/services/store.service';
import * as uuid from 'uuid';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit{
  forr:formulario={
    email:'',
    pass:''
  }
  log:boolean=true;
 public chats:any[]=[]
 public chat1:any[]=[]
  formreg =new FormGroup({
    email: new FormControl(),
   pass: new FormControl()
   
   })
   constructor(private ath:AuthService,private sto:StoreService,private rout:Router,private chat:ChatdataService,private db:Database){
  
  
   }
  ngOnInit(): void {
 
  
  }
register(){
  this.forr.email=this.formreg.value.email ;
  this.forr.pass=this.formreg.value.pass;
  this.ath.register(this.forr).then(async response=>{
    if(response.user.email) {
      await this.sto.createinit(response.user.email);
      this.log=true
    }

    })
  .catch(error=>console.log(error))
}
async login(){
  this.forr.email=this.formreg.value.email ;
  this.forr.pass=this.formreg.value.pass;
  await this.ath.login(this.forr).then((response)=>{
   
    this.sto.getdocID(this.forr.email)
    this.rout.navigate(['/main'])
    })
  .catch((error)=>{
    console.log(error)
  })
 
}
changueLR(){
 this.log=this.log? false:true
}
sub(){
 this.log? this.login():this.register()
} 
}

