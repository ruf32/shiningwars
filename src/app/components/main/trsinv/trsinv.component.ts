import { Component, Input } from '@angular/core';
import { front } from 'src/app/services/get-icon.service';
import { tropas } from 'src/app/services/store.service';

@Component({
  selector: 'app-trsinv',
  templateUrl: './trsinv.component.html',
  styleUrls: ['./trsinv.component.css']
})
export class TRSInvComponent {
@Input() tropa!:tropas
geticon(option:string):string{
  return front[option as keyof typeof front]
  }
}
