import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreService, solicitud } from 'src/app/services/store.service';

@Component({
  selector: 'app-poup3',
  templateUrl: './poup3.component.html',
  styleUrls: ['./poup3.component.css']
})
export class Poup3Component {
  hour=1
  min=0
  map='river1'
  email1=localStorage.getItem('email') as string
 points=300
sol:string
  constructor(public dia:MatDialogRef<Poup3Component>,private sto:StoreService,@Inject(MAT_DIALOG_DATA) public data: any,){
    
    this.sol=this.data.email
  }
  cerrar(){
    this.dia.close()
  }
  enviar(){
    
      var tiempo=''
      if (this.hour!=0) 
      tiempo+= this.hour+'h';
     if (this.min!=0) 
  tiempo+= this.min+'m';
  
   
  const obj:solicitud={
  Solicitante:localStorage.getItem('email') as string,
  Solicitado:this.sol,
  mapa:'river1',
  puntosBatalla:this.points,
  tiempo:tiempo,
  Status:{Estado:'Pendiente',Acept1:false,Acept2:false}
  
  }
  this.sto.enviasol(obj)
  this.dia.close()
  }
  
}
