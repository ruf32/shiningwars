import { Component, HostListener } from '@angular/core';
import { FireService } from './services/fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'juego2'
  
  constructor(private fire:FireService){

  }
 
}
