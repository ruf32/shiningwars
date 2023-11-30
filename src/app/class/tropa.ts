import { tropaIN } from "../interfaces/tropaIN"


export class tropa {
   Arma:Arma
   Armadura:Armadura
constructor(public tropaI:tropaIN){
    this.Arma=new Arma(this.tropaI.Arma as keyof typeof NArma)
    this.Armadura=new Armadura(this.tropaI.Armadura as keyof typeof NArmadura)
    if (!this.tropaI.PVMAX) this.tropaI.PVMAX=this.tropaI.PV!
    if (!this.tropaI.PMMAX) this.tropaI.PMMAX=this.tropaI.PM!
  
}
setcoord(c:coord){
    this.tropaI.coord=c

}
dataExport(){
    return this.tropaI
}
dataImport(tropaIM:tropaIN){
    this.tropaI=tropaIM
}
}
export class Arma{
    ATK:number
    DAÑ:number
    Alcance:number
    CritCh:number
    CritX:number
    
    constructor(private nombreA:keyof typeof NArma){

        this.ATK=armas[NArma[this.nombreA]].ATK
        this.DAÑ= armas[NArma[this.nombreA]].DAÑ
        this.Alcance=armas[NArma[this.nombreA]].Alcance
        this.CritCh=armas[NArma[this.nombreA]].CritCh
        this.CritX=armas[NArma[this.nombreA]].CritX
      
    }
    
    ataqueFIS(pj:tropa,enemy:tropa){
        const tiradaD=Math.random()
        console.log(tiradaD)
        let daño:number
        if(tiradaD>=(1-pj.Arma.CritCh)){ daño=(pj.tropaI.ATK+pj.Arma.DAÑ*pj.Arma.CritX*tiradaD*1.2)-((enemy.tropaI.DEF[0])+enemy.Armadura.DEFis)
        console.log('critical')}
        else daño=(pj.tropaI.ATK+pj.Arma.DAÑ*tiradaD*1.2)-((enemy.tropaI.DEF[0])+enemy.Armadura.DEFis)
        if (daño<10) daño=10
        return enemy.tropaI.PV!-=daño
        
    }
    
}
export class Armadura{
    DEFis:number
    DEFue:number
    DEFri:number
    DEVen:number
    DERay:number
    constructor(private narmadura:keyof typeof NArmadura){
        this.DEFis=armaduras[NArmadura[this.narmadura]].DEFis
        this.DEFue=armaduras[NArmadura[this.narmadura]].DEFue
        this.DEFri=armaduras[NArmadura[this.narmadura]].DEFri
        this.DEVen=armaduras[NArmadura[this.narmadura]].DEVen
        this.DERay=armaduras[NArmadura[this.narmadura]].DERay
    }
}
 export enum NArmadura{
    "noArmadura"=0,
    'cuero'=1,
    'ligera'=2,
    'media'=3,
    'pesada'=4,
    'completa'=5,
}
 export enum NArma{
    "noArma"=0,
    "Palo"=1,
    'arco'=2 ,
 'ballesta'=3 ,
 'lanza'=4 ,
 'daga'=5 ,
 'vara'=6 ,
 'lanzaCab'=7 ,
 'espada'=8 ,
}
const armaduras=[
    { DEFis:0.3,DEFue:0.2,DEFri:-0.5,DEVen:0,DERay:0.7},
    { DEFis:1.2,DEFue:0.5,DEFri:0,DEVen:0.3,DERay:0.8},
    { DEFis:1.7,DEFue:1,DEFri:1.5,DEVen:0.7,DERay:0},
    { DEFis:3,DEFue:1.5,DEFri:0.75,DEVen:1,DERay:0},
    { DEFis:3.5,DEFue:0,DEFri:1,DEVen:1.5,DERay:-1},
    { DEFis:5,DEFue:-1,DEFri:2,DEVen:2,DERay:-2}
]
export const armas=[
    {ATK:1.5,DAÑ:4,Alcance:1,CritCh:0.3,CritX:1.2},
    {ATK:2.5,DAÑ:6,Alcance:1,CritCh:0.2,CritX:1.5},
    {ATK:2,DAÑ:8,Alcance:2,CritCh:0.3,CritX:1.8},
    {ATK:4,DAÑ:6,Alcance:2,CritCh:0.2,CritX:2.5},
    {ATK:3.5,DAÑ:10,Alcance:2,CritCh:0.25,CritX:2},
    {ATK:3,DAÑ:8,Alcance:1,CritCh:0.5,CritX:1.75},
    {ATK:2,DAÑ:6,Alcance:1,CritCh:0.2,CritX:1.5},
    {ATK:5,DAÑ:10,Alcance:1,CritCh:0.3,CritX:3.5},
    {ATK:4,DAÑ:18,Alcance:1,CritCh:0.35,CritX:2.3},
]

export type coord={
x:number,
y:number
}
export type buf={
    Atributo:string,
    Buff:number,
    restante:number
}