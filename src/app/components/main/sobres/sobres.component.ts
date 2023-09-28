import { Component, OnInit } from '@angular/core';
import { front } from 'src/app/services/get-icon.service';
import { StoreService, sobres } from 'src/app/services/store.service';

@Component({
  selector: 'app-sobres',
  templateUrl: './sobres.component.html',
  styleUrls: ['./sobres.component.css']
})
export class SobresComponent implements OnInit{
  sobres:sobres[]=[];
  constructor(private sto:StoreService){

  }
  ngOnInit(): void {
   this.sto.getSobres().subscribe(data=>this.sobres=data)
  }
    geticon(option:string):string{
    return front[option as keyof typeof front]
    }
    opensobre(sob:sobres){
      this.sto.openSobre(sob)
    }
}
