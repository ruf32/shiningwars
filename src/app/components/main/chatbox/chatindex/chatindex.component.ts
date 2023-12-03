import { Component ,Output,EventEmitter,OnInit} from '@angular/core';
import { StoreService, Users } from 'src/app/services/store.service';

@Component({
  selector: 'app-chatindex',
  templateUrl: './chatindex.component.html',
  styleUrls: ['./chatindex.component.css']
})
export class ChatindexComponent implements OnInit{
  useractivo!:any
  chatsp:string[]=[]
@Output() chatselect=new EventEmitter<string>
constructor(private sto:StoreService){

}
selectchat(chat:string){
  console.log(chat)
this.chatselect.emit(chat)
}
ngOnInit(): void {
  this.sto.getUserbyemail(localStorage.getItem('email') as string).then((data)=>{
    
    if (data){this.useractivo=data
      console.log(this.useractivo)
     }
    
  })


}
}
