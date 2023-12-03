import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetIconService {

  constructor() { }
  geticon(option:string):string{
    return front[option as keyof typeof front]
    }
}

export enum backs{
  'tierra'='./assets/tierra.jpg',
  'ceniza'='./assets/ground.jpg',
  'agua'='./assets/agua.jpg',
  'hierba'='./assets/grass.jpg',
  'arbol'='./assets/arbol.jpg',
  'rock'='./assets/muro.jpg',
 
}
export enum front{
'Initial'='./assets/sobres/sobre1.png',

  //tropas
  'Peasant'='',
  'Heroe'='./assets/PJ/Heroe1.png' ,
 'Guerrero'='./assets/PJ/hacha1.png' ,
 'Arquero'='./assets/PJ/ballesta1.png' ,
 'Paladin'='./assets/PJ/caballero1.png' ,
 'picaro'='./assets/PJ/espada1.png' ,
 'caballero'='../../assets/PJ/caballo1.png' ,
 'heal'='./assets/PJ/heal1.png' ,
 'Sorcerer'='./assets/PJ/sorcer1.png' ,
 //tropasgame
 'Guerrero1'='./assets/PJ/hacha1.png' ,
 'Arquero1'='./assets/PJ/ballesta1.png' ,
 'Paladin1'='./assets/PJ/caballero1.png' ,
 'picaro1'='./assets/PJ/espada1.png' ,
 'caballero1'='./assets/PJ/caballo1.png' ,
 'heal1'='./assets/PJ/heal1.png' ,
 'Sorcerer1'='./assets/PJ/sorcer1.png' ,
 'Guerrero2'='./assets/PJ/hacha2.png' ,
 'Arquero2'='./assets/PJ/ballesta2.png' ,
 'Paladin2'='./assets/PJ/caballero2.png' ,
 'picaro2'='./assets/PJ/espada2.png' ,
 'caballero2'='./assets/PJ/caballo2.png' ,
 'heal2'='./assets/PJ/heal2.png' ,
 'Sorcerer2'='./assets/PJ/sorcer2.png' ,
 //Items-armas
 'arco'='./assets/arma/arco.png' ,
 'palo'='./assets/arma/porra.png' ,
 'ballesta'='./assets/arma/ballesta01.png' ,
 'lanza'='./assets/arma/lanza.png' ,
 'daga'='./assets/arma/daga2.png' ,
 'vara'='./assets/arma/baston3.png' ,
 'lanzaCab'='./assets/arma/lanzaC.png' ,
 'espada'='./assets/arma/espada01.png' ,
 'noArma'='./assets/arma/puno.png',
//items-armadura
'cuero'='./assets/armadura/armadura5.png',
'ligera'='./assets/armadura/armadura2.png',
'media'='./assets/armadura/armadura1.png',
'pesada'='./assets/armadura/armadura3.png',
'completa'='./assets/armadura/armadura4.png',
'noArmadura'='./assets/armadura/cuerpo.png',
//items 
'Pocion PV pequeña'='./assets/pociones/pocion.png',
'Pocion mp pequeña'='./assets/pociones/pocion5.png',
'UPDEF'='./assets/pociones/pocion1.png',
'UPVEL'='./assets/pociones/pocion3.png',
'UPFUE'='./assets/pociones/pocion4.png',
'UPMOV'='./assets/pociones/pocion2.png',
'UPATK'='./assets/pociones/pocion5.png',
//SKILLS
'Carga'='./assets/skills/carga.png',
'Daño'='./assets/skills/explosion.png',
'rompedef'='./assets/skills/romper.png',
'taunt'='./assets/skills/taunt.png',

'alcance'='./assets/skills/mirilla.png',
'critico'='./assets/skills/explosion.png',
'untaunt'='./assets/skills/untaunt.png',

'fuego'='./assets/skills/dom.png',
'hielo'='./assets/skills/hielo.png',
'rayo'='./assets/skills/electrico.png',
'confusion'='./assets/skills/depresion.png',
'mute'='./assets/skills/mute.png',

'curar'='./assets/skills/soltar.png',
'escudo'='./assets/skills/proteger.png',
'Movimiento'='./assets/skills/huracan.png',
'velocidad'='./assets/skills/huracan1.png',
'quitardebuff'='./assets/skills/sol.png',

'ocultarse'='./assets/skills/ninja.png',
'sangrante'='./assets/skills/sangre.png',
'vacio'='./assets/pociones/vacio1.png',
//mapas
'river1'='./assets/mapariver1.bmp'
}
export enum audio{
  'Audio0'='./assets/audio/audio0.mp3',
  'Audio1'='./assets/audio/audio1.mp3',
  'Audio2'='./assets/audio/audio2.mp3',
  'Audio3'='./assets/audio/audio3.mp3',
  'Audio4'='./assets/audio/audio4.mp3',
  'Audio5'='./assets/audio/audio5.mp3',
  'Audio6'='./assets/audio/audio6.mp3',
  'Audio7'='./assets/audio/audio7.mp3',
  'Audio8'='./assets/audio/audio8.mp3',
  'Audio9'='./assets/audio/audio9.mp3',

}
