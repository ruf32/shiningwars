import { Component, Input } from '@angular/core';
import { tropas } from 'src/app/services/store.service';

@Component({
  selector: 'app-trsinfo',
  templateUrl: './trsinfo.component.html',
  styleUrls: ['./trsinfo.component.css']
})
export class TRSInfoComponent {
@Input () tropa!:tropas
}
