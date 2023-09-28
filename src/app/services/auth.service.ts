import { Injectable } from '@angular/core';
import {Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut}from '@angular/fire/auth'
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private ath:Auth,private sto:StoreService) { }

  register(form:formulario){
    return createUserWithEmailAndPassword(this.ath,form.email,form.pass)
    }
  login(form:formulario){
     localStorage.setItem('email',form.email)
    this.sto.getdocID(form.email)
      return signInWithEmailAndPassword(this.ath,form.email,form.pass)
    }
    logout(){
      localStorage.clear();
      return signOut(this.ath);
    }
}
export interface formulario{
  email:string,
  pass:string
}