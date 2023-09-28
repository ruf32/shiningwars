import {tropas} from '../services/store.service'
export class tropagame{
    PVMax:number
    PVact:number
    PMMax:number
    PMact:number
    coord?:{x:number,y:number}
    Arma:Arma
    Armadura:Armadura
    player:number
    ATK:number
    DEF:number[]
    constructor(private tropa:tropas,private playerE:number){
this.PVMax=this.tropa.PV
this.PVact=this.tropa.PV
this.PMMax=this.tropa.PM
this.PMact=this.tropa.PM
this.Arma= new Arma(this.tropa.ARMA as keyof typeof NArma)
this.Armadura=new Armadura(this.tropa.ARMADURA as keyof typeof NArmadura)
this.player=this.playerE
this.ATK=this.tropa.FUE+this.Arma.ATK
this.DEF=[
    this.tropa.DEF+this.Armadura.DEFis,
    this.Armadura.DEFue,
    this.Armadura.DEFri,
    this.Armadura.DEVen,
    this.Armadura.DERay,
]
    }
    setCoord(x:number,y:number){
        this.coord={x:x,y:y}
        return this.DataExport()
    }
    DataExport(){
        return {
            ID:this.tropa.id,
            player:this.player,
            Nombre:this.tropa.Nombre,
            PVMax:this.PVMax,
            PVact:this.PVact,
            PMMax:this.PMMax,
            PMact:this.PMact,
            Arma:this.tropa.ARMA,
            Armadura:this.tropa.ARMADURA,
            SKILL1:this.tropa.SKILL1,
            ITEM1:this.tropa.ITEM1,
            MOV:this.tropa.MOV,
            coord:[this.coord?.x,this.coord?.y]

            
        }
    }
    getID(){
        return this.tropa.id
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
    ataqueFIS(pj:tropagame,enemy:tropagame){
        const tiradaD=Math.random()
        let daño:number
        if(tiradaD>(1-pj.Arma.CritCh)) daño=(pj.ATK+pj.Arma.DAÑ)*pj.Arma.CritX-(enemy.DEF[0])
        else daño=(pj.ATK+pj.Arma.DAÑ)-(enemy.DEF[0])
        if (daño<1) daño=10
        return enemy.PVact-=daño
        
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
enum NArmadura{
    "NoArmadura"=0,
    'cuero'=1,
    'ligera'=2,
    'media'=3,
    'pesada'=4,
    'completa'=5,
}
 enum NArma{
    "NoArma"=0,
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
const armas=[
    {ATK:1,DAÑ:4,Alcance:1,CritCh:0.3,CritX:1.2},
    {ATK:1,DAÑ:6,Alcance:1,CritCh:0.2,CritX:1.5},
    {ATK:1.3,DAÑ:8,Alcance:2,CritCh:0.3,CritX:1.8},
    {ATK:2,DAÑ:6,Alcance:2,CritCh:0.2,CritX:2.5},
    {ATK:1.8,DAÑ:10,Alcance:2,CritCh:0.25,CritX:2},
    {ATK:1,DAÑ:8,Alcance:1,CritCh:0.5,CritX:1.75},
    {ATK:0.5,DAÑ:6,Alcance:1,CritCh:0.2,CritX:1.5},
    {ATK:2.6,DAÑ:10,Alcance:1,CritCh:0.3,CritX:3.5},
    {ATK:1.9,DAÑ:18,Alcance:1,CritCh:0.35,CritX:2.3},
]
