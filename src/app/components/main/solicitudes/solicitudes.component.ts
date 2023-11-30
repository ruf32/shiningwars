import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { StoreService, Users, solicitud } from 'src/app/services/store.service';
import { PopupComponent } from '../popup/popup.component';
import { tropaIN } from 'src/app/interfaces/tropaIN';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit{
  solicitudes:solicitud[]=[]
  users:Users[]=[]
  email=localStorage.getItem('email') as string
  activas:tropaIN[]=[]
 
  constructor(private sto:StoreService,private diag:MatDialog){
   
    
 }
 
  ngOnInit(): void {
    this.sto.getsolicitudes().subscribe(data=>{
      this.solicitudes=data.filter(element=>element.Status?.Estado=='Pendiente')
    
    }) 
  this.sto.getactivetroops().subscribe(data=>{this.activas=data})
}
 opensolictud(item:solicitud) {

 const dialogRef = this.diag.open(PopupComponent, {
    width: '400px',
    height: 'auto',
    disableClose: true,
    data:{solcicitud:item,
      tropas:this.activas
    }
  })
  
  
}
}
