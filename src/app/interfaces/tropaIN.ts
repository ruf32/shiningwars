import { NArma, NArmadura } from "../class/tropa"

export interface tropaIN{
    id:string,          //ID-DOC
    Nombre:string,      //Nombre personalizado
    clase:string,       //tipo de tropa
    PVMAX:number,       //puntos de vida maximo
    PV?:number,         //(Combate) puntos de vida actuales
    PMMAX:number,       //puntos de magia maximo
    PM?:number,         //(Combate) puntos de magia actuales
    Arma:string,        //Arma equipada(NoArma si no lleva)
    Armadura:string,    //Armadura equipada(NoArmadura si no lleva)
    Item:string[],      //objetos equipados([] si no lleva)
    Skill:string[],     //habilidades equipadas([] si no lleva)
    ATK:number,         //ATK base de personaje sin arma
    DEF:number[],       //DEF base de personaje[0 fisica]
    VEL:number,         //velocidad de actuacion(turnos)
    MOV:number,         //casillas de movimiento
    BP:number,          //puntos de Batalla totales
    activa?:boolean,     //activa tropa 
    coord?:coord        //(combate)coordenadas
    Buff?:buf[]         //(combate)
    player?:string      
}
export type coord={
x:number,
y:number
}
export type buf={
    Atributo:string,
    Buff:number,
    restante:number
}