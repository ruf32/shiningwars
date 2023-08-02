import { Component, OnInit } from '@angular/core';
import { Users } from '../interfaces/inter';
import { Observable } from 'rxjs';
import { FireService } from 'src/app/services/fire.service';
import { Router } from '@angular/router';
import {MatDialog} from'@angular/material/dialog'
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit{
  Users:Users[]=[]
  email=localStorage.getItem('email')
  private audi=new Audio();
  constructor(private fire:FireService,private rout:Router ,private dialog:MatDialog){
 
  }
  ngOnInit(): void {
    this.getusers().subscribe((dat)=>{
      this.Users=dat
      
    })
    this.audi.src="../../assets/audio1.mp3"
    this.audi.loop=true;
    this.audi.play();
  }
  getusers(){
 return this.fire.getUsers()
  }
gotrop(){
this.audi.pause()
this.rout.navigate(['/mytroops'])
}
gowar(email:string){
localStorage.setItem('sol',email)
  const dialogRef = this.dialog.open(PopupComponent, {
    width: '400px',
    height: 'auto',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El popup se cerró.');
  });
}
}
