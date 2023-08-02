import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetIconService {

  constructor() { }
  geticon(option:string):string{
    var str='';
    switch(option){
      //Sobres
      case 'Initial':str='../../../assets/sobre1.png';break
      case 'Basic': str='../../../assets/sobre2.png';break
      case 'Avanzado' :str='../../../assets/sobre3.png';break
      case 'Especial':str='../../../assets/sobre4.png';break
      //Tropas
      case 'Peasant' :str='../../../assets/granjero.png';break
      case 'Arquero': str='../../../assets/ballesta1.png';break
      case 'Paladin' :str='../../../assets/caballero1.png';break
      case 'Guerrero':str='../../../assets/hacha1.png';break
      case 'Picaro': str='../../../assets/espada1.png';break
      case 'Caballero' :str='../../../assets/caballo1.png';break
      case 'Curandero':str='../../../assets/heal1.png';break
      case 'Hechicero': str='../../../assets/sorcer1.png';break
      //Equipo
      case 'palo':str='../../../assets/porra.png';break
      case 'Pocion PV pequeña':str='../../../assets/pocion.png';break
      //Skills
        case 'Carga': str='../../../assets/carga.png';break
    }
  return str
}

}