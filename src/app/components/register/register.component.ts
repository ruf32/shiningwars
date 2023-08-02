import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {formulario} from '../interfaces/inter'
import{FireService} from '../../services/fire.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
forr:formulario={
  email:'',
  pass:''
}
audi=new Audio();
Audioenable=true;
formreg =new FormGroup({
email: new FormControl(),
pass: new FormControl()
})
constructor(private fire:FireService,private rout:Router){

}
  ngOnInit(): void {
    
    this.audi.src="../../assets/audio5.mp3"
    this.audi.loop=true;
    this.audi.play();
  }
  

submit(){
  this.forr.email=this.formreg.value.email ;
  this.forr.pass=this.formreg.value.pass;
  
this.fire.register(this.forr).then(response=>{

if(response.user.email) {
  this.fire.setemail(response.user.email);
  
  this.fire.createinit();
}
})
.catch(error=>console.log(error))
this.rout.navigate(['/login'])
}
Audiochangue(){
  if (this.Audioenable) {this.audi.muted=true;this.Audioenable=false}
  else{this.audi.muted=false;this.Audioenable=true}
}
}
