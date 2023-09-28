export class casilla{
    back:keyof typeof back
    collision:boolean
    id:string
    player:number=0
constructor(private backs:string,col:boolean,id:string|number){
    this.back=backs as keyof typeof back
    this.collision=col
    if (id== 0) this.id='0'
    else this.id=id as string
   
}
setInitial(ID:string,player:number){
this.id=ID
this.player=player
}
setVacio(){
    this.id='0'
    this.player=0
}
}
export enum back{
    'tierra'='./assets/tierra.jpg',
    'ceniza'='./assets/ground.jpg',
    'agua'='./assets/agua.jpg',
    'hierba'='./assets/grass.jpg',
    'arbol'='./assets/arbol.jpg',
    'rock'='./assets/muro.jpg',
}