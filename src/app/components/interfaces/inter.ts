export interface formulario{
    email:string,
    pass:string
}
export interface sobres{
    ID:number,
    tipo:string
    id?:string
}
export interface tropas{
    Nombre:string,
    BattlePoints:number,
    FUE:number,
    DEF:number,
    VEL:number,
    MOV:number,
    PV:number,
    PM:number,
    activa:boolean,
    ARMA?:string,
    ARMADURA?:string,
    ITEM1?:string[]|null,
    SKILL1?:string[]|null,
    id:string
    funci?:Function[]
}
export interface items{
    tipo:string,
    nombre:string,
    FUE?:number,
    DEF?:number,
    VEL?:number,
    MOV?:number,
    PV?:number,
    PM?:number,
    SKILL1?:string|null
}
export interface skill{
    tipo:string,
    nombre:string,
    FUE?:number,
    DEF?:number,
    VEL?:number,
    MOV?:number,
    PV?:number,
    PM?:number,
}
export interface Users{
Estado:boolean
email:string
Helo:number
Batlle?:string|null
Gamesplayed:number
gamesWon:number
gameslose:number
}
export enum Icon{
    'Peasant'='../../assets/'
}
export interface cell{
    back:keyof typeof backs,
    id:number,
    collision?:boolean,
 
}
export enum backs{
    'tierra'='./assets/tierra.jpg',
    'ceniza'='./assets/ground.jpg',
    'agua'='./assets/agua.jpg',
    'hierba'='./assets/grass.jpg',
    'arbol'='./assets/arbol.jpg',
    'rock'='./assets/muro.jpg',
   
}
export interface solicitud{
    Solicitante:string
    Solicitado:string
    mapa:string
    puntosBatalla:number
    tiempo:string
}