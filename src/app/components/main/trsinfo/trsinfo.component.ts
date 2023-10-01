import { Component, Input } from '@angular/core';
import { tropaIN } from 'src/app/interfaces/tropaIN';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-trsinfo',
  templateUrl: './trsinfo.component.html',
  styleUrls: ['./trsinfo.component.css']
})
export class TRSInfoComponent {
@Input () tropa!:tropaIN
constructor(private sto:StoreService){

}
changueactiva(){
this.sto.changuetroopact(this.tropa.id,this.tropa.activa!)
this.tropa.activa= this.tropa.activa? false:true
}
}
