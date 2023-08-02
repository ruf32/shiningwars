import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-popupsolicitudes',
  templateUrl: './popupsolicitudes.component.html',
  styleUrls: ['./popupsolicitudes.component.css']
})
export class PopupsolicitudesComponent implements OnInit {
  solicitudes:any=[]
  constructor(private fire:FireService){

  }
  ngOnInit(): void {
    this.getsolictudes()
  }

getsolictudes(){
this.fire.getsolicitudes(localStorage.getItem('email')as string).then((data)=>
{
this.solicitudes=data
})
}
}
