import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { StoreService, Users, solicitud } from 'src/app/services/store.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit{
  solicitudes:solicitud[]=[]
  users:Users[]=[]
  email=localStorage.getItem('email') as string
  
 
  constructor(private sto:StoreService,private diag:MatDialog){
   
    
 }
 
  ngOnInit(): void {
    this.sto.getsolicitudes().subscribe(data=>{
      this.solicitudes=data
      this.solicitudes.forEach(element=>{
        this.sto.getstatusplayer(element.Solicitante).then(dta=>element.STATU=dta)
      })
    }) 
  
}
 opensolictud(item:solicitud) {

 const dialogRef = this.diag.open(PopupComponent, {
    width: '400px',
    height: 'auto',
    disableClose: true,
    data:item
  })
  
  
}
}
