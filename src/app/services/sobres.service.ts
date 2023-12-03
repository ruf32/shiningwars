import { Injectable } from '@angular/core';
import { items, skill } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class SobresService {

  constructor() { }
 private sobrestropas=[
   [//tropas
   {Nombre:'Guerrero',clase:'Guerrero', BP:30,ATK:6,DEF:[2],VEL:3,MOV:3,PVMAX:200,PMMAX:20,Arma:'noArma',Armadura:'noArmadura',Item:[],Skill:[]},
   {Nombre:'Paladin',clase:'Paladin',BP:30,ATK:4,DEF:[5],VEL:2,MOV:3,PVMAX:250,PMMAX:20,Arma:'noArma',Armadura:'noArmadura',Item:[],Skill:[]},
   {Nombre:'Arquero',clase:'Arquero',BP:40,ATK:3,DEF:[1],VEL:5,MOV:4,PVMAX:150,PMMAX:40,Arma:'noArma',Armadura:'noArmadura',Item:[],Skill:[]},
   {Nombre:'picaro',clase:'picaro',BP:40,ATK:3,DEF:[1],VEL:6,MOV:4,PVMAX:125,PMMAX:40,Arma:'noArma',Armadura:'noArmadura',Item:[],Skill:[]},
   {Nombre:'caballero',clase:'caballero',BP:50,ATK:6,DEF:[4],VEL:3,MOV:6,PVMAX:250,PMMAX:10,Arma:'noArma',Armadura:'noArmadura',Item:[],Skill:[]},
   {Nombre:'heal',clase:'heal',BP:50,ATK:2,DEF:[0],VEL:3,MOV:3,PVMAX:125,PMMAX:60,Arma:'noArma',Armadura:'noArmadura',Item:[],Skill:[]},
   {Nombre:'Sorcerer',clase:'Sorcerer',BP:50,ATK:2,DEF:[0],VEL:3,MOV:3,PVMAX:125,PMMAX:60,Arma:'noArma',Armadura:'noArmadura',Item:[],Skill:[]}],
   //fin tropas
[//inventario
   [//armas
   {tipo:'Arma',nombre:'palo',ATK:1,},
   {tipo:'Arma',nombre:'espada',ATK:3,},
   {tipo:'Arma',nombre:'lanza',ATK:2,},
   {tipo:'Arma',nombre:'arco',ATK:2,},
   {tipo:'Arma',nombre:'daga',ATK:2,},
   {tipo:'Arma',nombre:'ballesta',ATK:4,},
   {tipo:'Arma',nombre:'vara',PMMAX:20},
   {tipo:'Arma',nombre:'LanzaC',ATK:4}]
   //fin armas
 ,[//Armaduras
   {tipo:'Armadura',nombre:'cuero'},
   {tipo:'Armadura',nombre:'ligera'},
   {tipo:'Armadura',nombre:'media'},
   {tipo:'Armadura',nombre:'pesada'},
   {tipo:'Armadura',nombre:'completa'},
   ]//fin Armaduras
 ,[//pociones
   {tipo:'Item',nombre:'Pocion PV pequeña'},
   {tipo:'Item',nombre:'Pocion mp pequeña',},
   ]//fin pociones
   ,[//items
   {tipo:'Item',nombre:'UPDEF',},
   {tipo:'Item',nombre:'UPATK'},
   {tipo:'Item',nombre:'UPVEL'},
   {tipo:'Item',nombre:'UPMOV'},
   ]// fin items
]//fin inevntario
,[//skils
[//cuerpo
{tipo:'Cuerpo',nombre:'Carga'},
{tipo:'Cuerpo',nombre:'Daño'},
{tipo:'Cuerpo',nombre:'rompedef'},
{tipo:'Cuerpo',nombre:'taunt'}
]//fin cc
,[//dist
{tipo:'distancia',nombre:'alcance',},
{tipo:'distancia',nombre:'Daño',},
{tipo:'distancia',nombre:'critico',},
{tipo:'distancia',nombre:'untaunt',}
]//din dist
,[//sorcer
{tipo:'sorcer',nombre:'fuego',},
{tipo:'sorcer',nombre:'rayo',},
{tipo:'sorcer',nombre:'hielo',},
{tipo:'sorcer',nombre:'confusion',},
{tipo:'sorcer',nombre:'mute',}
]//fin socer
,[//heal
{tipo:'heal',nombre:'curar',},
{tipo:'heal',nombre:'escudo',},
{tipo:'heal',nombre:'Movimiento'},
{tipo:'heal',nombre:'velocidad'},
{tipo:'heal',nombre:'quitardebuff'}
]//fin heal
,[//picaro
{tipo:'picaro',nombre:'untaunt',},
{tipo:'picaro',nombre:'ocultarse'},
{tipo:'picaro',nombre:'critico',},
{tipo:'picaro',nombre:'sangrante'}
]//fin picaro
]//fin skills
]//fin
sobres(tipo:string):any[]{
  var result=0
  var rand=0
  var res=[]
  const completo=this.sobrestropas
    switch(tipo){
   case 'Initial': {
    for (let x=0;x<8;x++){
      switch(x){
        case 0:{
          //tropa1
       rand=Math.random()*100
       const trop:Option={op0:40,op1:55,op2:70,op3:80,op4:90,op5:95}
       result=this.Option7(trop,rand)
          res.push(completo[0][result]);
          break;
        }
        case 1:{
          //tropa2
          rand=Math.random()*100
          const trop:Option={op0:20,op1:40,op2:60,op3:75,op4:90,op5:95}
       result=this.Option7(trop,rand)
          res.push(completo[0][result])
          break;
        }
        case 2:{
          //tropa3
          const trop:Option={op0:5,op1:10,op2:25,op3:40,op4:60,op5:80}
       result=this.Option7(trop,rand)
          res.push(completo[0][result])
          break;
        }
        case 3:{
          //inventario1
          rand=Math.random()*100
          const trop:Option={op0:10,op1:20,op2:70}
       result=this.Option4(trop,rand)
          const arr=completo[1][result] as Array<items>//seleccion tipo
          rand=Math.random()*100
          
          result++
   switch(result){//seleccion ojeto
    case 1:{//armas
      const trop:Option={op0:15,op1:30,op2:45,op3:60,op4:70,op5:80,op6:90}
      result=this.Option8(trop,rand) 
      break
    }
     case 2:{ //Armaduras
      const trop:Option={op0:40,op1:70,op2:85,op3:95}
      result=this.Option5(trop,rand) 
      break
   }
   case 3:{ //pociones
    const trop:Option={op0:70,op1:30}
      result=this.Option2(trop,rand) 
      break
  }
  case 4:{ //PowerUps
    const trop:Option={op0:40,op1:60,op2:70}
    result=this.Option4(trop,rand) 
    break
  }
          
        }
        
        res.push(arr[result])
        break;
      }
      case 4:{
        //inventario2
        rand=Math.random()*100
        const trop:Option={op0:40,op1:50,op2:80}
     result=this.Option4(trop,rand)
        const arr=completo[1][result] as Array<items>//seleccion tipo
        rand=Math.random()*100
        
        result++
  switch(result){//seleccion ojeto
  case 1:{//armas
    const trop:Option={op0:15,op1:30,op2:45,op3:60,op4:70,op5:80,op6:90}
    result=this.Option8(trop,rand) 
    break
  }
   case 2:{ //Armaduras
    const trop:Option={op0:40,op1:70,op2:85,op3:95}
    result=this.Option5(trop,rand) 
    break
  }
  case 3:{ //pociones
  const trop:Option={op0:70,op1:30}
    result=this.Option2(trop,rand) 
    break
  }
  case 4:{ //PowerUps
  const trop:Option={op0:40,op1:60,op2:70}
  result=this.Option4(trop,rand) 
  break
  }
        
      }
     
      res.push(arr[result])
      break;
    }
    case 5:{
      //inventario3
      rand=Math.random()*100
      const trop:Option={op0:40,op1:50,op2:80}
   result=this.Option4(trop,rand)
      const arr=completo[1][result] as Array<items>//seleccion tipo
      rand=Math.random()*100
      
      result++
  switch(result){//seleccion ojeto
  case 1:{//armas
  const trop:Option={op0:15,op1:30,op2:45,op3:60,op4:70,op5:80,op6:90}
  result=this.Option8(trop,rand) 
  break
  }
  case 2:{ //Armaduras
  const trop:Option={op0:40,op1:70,op2:85,op3:95}
  result=this.Option5(trop,rand) 
  break
  }
  case 3:{ //pociones
  const trop:Option={op0:70,op1:30}
  result=this.Option2(trop,rand) 
  break
  }
  case 4:{ //PowerUps
  const trop:Option={op0:40,op1:60,op2:70}
  result=this.Option4(trop,rand) 
  break
  }
      
    }
   
    res.push(arr[result])
    break;
  }
  case 6:{
    //skill tipo
    rand=Math.random()*100
    const trop:Option={op0:35,op1:70,op2:80,op3:90}
  result=this.Option5(trop,rand)
    const arr=completo[2][result] as Array<skill>//seleccion tipo
    rand=Math.random()*100
    
    result++
  switch(result){//seleccion skill
  case 1:{//cuerpo
  const trop:Option={op0:35,op1:60,op2:80}
  result=this.Option4(trop,rand) 
  break
  }
  case 2:{ //dist
  const trop:Option={op0:35,op1:60,op2:80}
  result=this.Option4(trop,rand) 
  break
  }
  case 3:{ //sorcer
  const trop:Option={op0:25,op1:50,op2:75,op3:90}
  result=this.Option5(trop,rand) 
  break
  }
  case 4:{ //heal
    const trop:Option={op0:35,op1:60,op2:75,op3:90}
  result=this.Option5(trop,rand) 
  break
  }
  case 5:{ //picaro
    const trop:Option={op0:10,op1:60,op2:90}
    result=this.Option4(trop,rand) 
    break
    }
    
  }
  
  res.push(arr[result])
  break;
  }
  case 7:{
    //skill tipo
    rand=Math.random()*100
    const trop:Option={op0:10,op1:20,op2:50,op3:80}
  result=this.Option5(trop,rand)
  
    const arr=completo[2][result] as Array<skill>//seleccion tipo
    rand=Math.random()*100
    result++
  switch(result){//seleccion skill
  case 1:{//cuerpo
  const trop:Option={op0:35,op1:60,op2:80}
  result=this.Option4(trop,rand) 
  break
  }
  case 2:{ //dist
  const trop:Option={op0:35,op1:60,op2:80}
  result=this.Option4(trop,rand) 
  break
  }
  case 3:{ //sorcer
  const trop:Option={op0:25,op1:50,op2:75,op3:90}
  result=this.Option5(trop,rand) 
  break
  }
  case 4:{ //heal
    const trop:Option={op0:35,op1:60,op2:75,op3:90}
  result=this.Option5(trop,rand) 
  break
  }
  case 5:{ //picaro
    const trop:Option={op0:10,op1:60,op2:90}
    result=this.Option4(trop,rand) 
    break
    }
    
  }
  
  res.push(arr[result])
  break;
  }
    }
   }
    }
    
    }//fin bucle
    return res
   }//fin funcion
  
  

  //funciones option
Option8(obj:Option,rand:number):number{
    let result2=0
      if(rand<obj.op0) result2=0;
      if((rand>=obj.op0)&&(rand<obj.op1) )result2=1;
      if((rand>=obj.op1)&&(rand<obj.op2!) )result2=2;
      if((rand>=obj.op2!)&&(rand<obj.op3!) )result2=3;
      if((rand>=obj.op3!)&&(rand<obj.op4!) )result2=4;
      if((rand>=obj.op5!)&&(rand<obj.op6!) )result2=5;
      if((rand>=obj.op6!)&&(rand<obj.op7!) )result2=6;
      if(rand>=obj.op7!) result2=7
      return result2
    }
Option7(obj:Option,rand:number):number{
      let result2=0
        if(rand<obj.op0) result2=0;
        if((rand>=obj.op0)&&(rand<obj.op1) )result2=1;
        if((rand>=obj.op1)&&(rand<obj.op2!) )result2=2;
        if((rand>=obj.op2!)&&(rand<obj.op3!) )result2=3;
        if((rand>=obj.op3!)&&(rand<obj.op4!) )result2=4;
        if((rand>=obj.op4!)&&(rand<obj.op5!) )result2=5;
        if(rand>=obj.op5!) result2=6
        return result2
      }
Option5(obj:Option,rand:number){
      let result2=0
          if(rand<obj.op0) result2=0;
          if((rand>=obj.op0)&&(rand<obj.op1) )result2=1;
          if((rand>=obj.op1)&&(rand<obj.op2!) )result2=2;
          if((rand>=obj.op2!)&&(rand<obj.op3!) )result2=3;
          if(rand>=obj.op3!) result2=4
          return result2
        }
Option4(obj:Option,rand:number){
      var result2=0
        if(rand<obj.op0) result2=0;
        if((rand>=obj.op0)&&(rand<obj.op1) )result2=1;
        if((rand>=obj.op1)&&(rand<obj.op2!) )result2=2;
        if(rand>=obj.op2!) result2=3
        return result2
          }
Option2(obj:Option,rand:number):number{
      let result2=0
        if(rand<obj.op0) result2=0;
        if(rand>=obj.op0) result2=1
        return result2
        }
    
    
}
 interface Option{
  op0:number,
  op1:number,
  op2?:number,
  op3?:number,
  op4?:number,
  op5?:number,
  op6?:number,
  op7?:number,
  }
