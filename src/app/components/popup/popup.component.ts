import { Component } from '@angular/core';
import{MatDialogRef} from '@angular/material/dialog'
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  points:number=300
  hour:number=1
  min:number=0
  sol=localStorage.getItem('sol') as string
constructor(public dialogref:MatDialogRef<PopupComponent>){

}
cerrar(){
  this.dialogref.close()
}
}
