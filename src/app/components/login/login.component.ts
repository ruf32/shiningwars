import { Component, OnInit } from '@angular/core';
import { formulario } from '../interfaces/inter';
import { FormControl, FormGroup } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  Audioenable=true
  loading=true;
  forr:formulario={
    email:'',
    pass:''
  }
  formreg =new FormGroup({
  email: new FormControl(),
  pass: new FormControl()
  })
  audi= new Audio();
  constructor(private fire:FireService,private route:Router){

  }
  ngOnInit(): void {
   if (this.Audioenable){
    this.audi.src="../../assets/audio5.mp3"
    this.audi.loop=true;
    this.audi.play();}
  }
  Audiochangue(){
    if (this.Audioenable) {this.audi.muted=true;this.Audioenable=false}
    else{this.audi.muted=false;this.Audioenable=true}
  }
  async submit(){
    this.forr.email=this.formreg.value.email ;
    this.forr.pass=this.formreg.value.pass;
    
   await this.fire.login(this.forr).then((response)=>{
      this.fire.changueStatusOn()
    }).catch((error)=>{
console.log(error)
    })
   this.route.navigate(['/mytroops'])
   this.audi.pause()
  }
}
