import { Injectable } from '@angular/core';
import {onSnapshot,Firestore,addDoc,collection,collectionData, query,docData, getDocs,collectionChanges, where, doc,updateDoc, deleteDoc, getDoc, QuerySnapshot, DocumentReference, DocumentSnapshot, docSnapshots, setDoc} from'@angular/fire/firestore'
import { Observable } from 'rxjs';
import { SobresService } from './sobres.service';
import { back, casilla} from '../objetos/Board';
import * as uuid from 'uuid';
import { cell, fila } from '../interfaces/cell';
import { tropaIN } from '../interfaces/tropaIN';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private sto:Firestore,private sobre:SobresService) { }
  //funcion crear documentos y librerias iniciales

  async createinit(email:string){

    let docref=collection(this.sto,email);
     const doc= await addDoc(docref,{Gamesplayed:0,gamesWon:0,gamesLose:0});
    const init=[
      {ID:0,tipo:'Initial'},
      {Nombre:'Heroe',clase:'Heroe', BP:40,ATK:4,DEF:[2],VEL:3,MOV:3,PV:300,PM:60,Arma:'noArma',Armadura:'noArmadura',Item:[],Skill:[]},
      {tipo:'Arma',nombre:'palo',equipada:'0'},
      {tipo:'Item',nombre:'Pocion PV pequeña',equipada:'0'},
      {tipo:'Cuerpo',nombre:'Carga',equipada:'0'}
      ]
     
    docref=collection(this.sto,email+'/'+doc.id+'/sobres')
    addDoc(docref,init[0])
    addDoc(docref,init[0])
    docref=collection(this.sto,email+'/'+doc.id,'tropas')
    addDoc(docref,init[1])
    docref=collection(this.sto,email+'/'+doc.id,'equipo')
    addDoc(docref,init[2])
    addDoc(docref,init[3])
    docref=collection(this.sto,email+'/'+doc.id,'Habilidades')
    addDoc(docref,init[4])
    addDoc(collection(this.sto,'Users'),{Gamesplayed:0,gamesWon:0,gameslose:0,Helo:0,email:email,Estado:false,chats:[],chatsp:[],chatsj:[]})
    }
 // funcion de recuperacion de documento de usuario
async getdocID(email:string){
   const userQuery=query(collection(this.sto,email))
   const snap=await getDocs(userQuery);
   if(snap){
      localStorage.setItem('doc',snap.docs[0].id)
    }
    return snap.docs[0].id
  }
//funcion de battlenet de recoleccion de usuarios
getUsers():Observable<Users[]>{
    const col=collection(this.sto,'Users')
    return collectionData(col,{idField:'id'}) as Observable<Users[]>
    }
//funcion dashboard para sobres
getSobres():Observable<sobres[]>{
  const subCollectionRef = collection(this.sto,localStorage.getItem('email')as string,localStorage.getItem('doc')as string, 'sobres');
  return collectionData(subCollectionRef,{idField:'id'}) as Observable<sobres[]>
  }
//funcion dashboard para todas las tropas
getropas():Observable<tropaIN[]>{
  const subCollectionRef = collection(this.sto,localStorage.getItem('email')as string,localStorage.getItem('doc')as string, 'tropas');
  return collectionData(subCollectionRef,{idField:'id'}) as Observable<tropaIN[]>
  }
//funcion dashboard para inventario
getitems():Observable<items[]>{
  const subCollectionRef = query(collection(this.sto,localStorage.getItem('email')as string,localStorage.getItem('doc')as string,'equipo'),where('equipada','==','0'));
  return collectionData(subCollectionRef,{idField:'id'}) as Observable<items[]>
  }
//funcion dashboard para habilidades
getSkills():Observable<skill[]>{
  const subCollectionRef = query(collection(this.sto,localStorage.getItem('email')as string,localStorage.getItem('doc')as string, 'Habilidades'),where('equipada','==','0'));
  return collectionData(subCollectionRef,{idField:'id'}) as Observable<skill[]>
  }
  getsolicitudes():Observable<solicitud[]>{   
 
    return collectionData(collection(this.sto,'solicitudes'),{idField:'id'})as Observable<solicitud[]>
   
  }
//funcion dashboard para tropas activas
 getactivetroops(){
  
    const q = query(collection(this.sto,localStorage.getItem('email')as string,localStorage.getItem('doc')as string,'tropas'), where('activa', '==', true));
   
    return collectionData(q,{idField:'id'}) as Observable<tropaIN[]>
  
  }
  //funcion cambio de tropas a activas/inactivas
async changuetroopact(troop:string,activa:boolean){
  const collec= collection(this.sto,localStorage.getItem('email')as string,localStorage.getItem('doc')as string,'tropas')
  const docref=doc(collec,troop)
  if (activa ) await updateDoc(docref,{activa:false});
  else await updateDoc(docref,{activa:true})
  }
  openSobre(sob:sobres){
    var carpeta=''
   
      const root=localStorage.getItem('email')+'/'+localStorage.getItem('doc')+'/sobres'
      const col=collection(this.sto,root)
    const docref= doc(col,sob.id);
    switch(sob.tipo){
      case 'Initial' :
        {
         const cards=this.sobre.sobres('Initial')
         for(let x=0;x<8;x++){
            if(x<3)  carpeta='tropas';
            if ((x>=3)&&(x<6))carpeta='equipo'
            if(x>=6)    carpeta='Habilidades'
            const col2=collection(this.sto,localStorage.getItem('email') as string,localStorage.getItem('doc') as string,carpeta)
            if(x>=3) cards[x].equipada='0'
            addDoc(col2,cards[x])
            deleteDoc(docref)
         }
        }
  }
  }
  async setStatus(changue:boolean){
  const q=query(collection(this.sto,'Users'),where('email','==',localStorage.getItem('email')as string))
  await getDocs(q).then(value=>{
    const docr=doc(this.sto,'Users',value.docs[0].id)
   changue? updateDoc(docr,{Estado:true}) :updateDoc(docr,{Estado:false})
  })
  
}

getdocbyID(ID:string,email:string,docID:string,carpeta:string){
  return doc(this.sto,email,docID,carpeta,ID)
}
getsolbyID(ID:string){
  return doc(this.sto,'solicitudes',ID)
}
async setdocByID(IDItem:DocumentReference,IDtropa:DocumentReference,nombre:string,campo:string,accion:string){
  
  switch(campo){
    case 'Arma':
if (accion=='equipar'){
await updateDoc(IDItem,{equipada:IDtropa.id})
await updateDoc(IDtropa,{Arma:nombre})
  }else {
    await updateDoc(IDItem,{equipada:'0'})
    await updateDoc(IDtropa,{Arma:'noArma'})
}
break;
case 'Armadura':
  
  if (accion=='equipar'){
    await updateDoc(IDItem,{equipada:IDtropa.id})
    await updateDoc(IDtropa,{Armadura:nombre})
      }else {
        await updateDoc(IDItem,{equipada:'0'})
        await updateDoc(IDtropa,{Armadura:'noArma'})
    } 
    break;
    case 'Item':
      if (accion=='equipar'){
        let itemlist:string[]=[]
      itemlist= (await getDoc(IDtropa)).get('Item')
       
        itemlist.push(nombre)
        console.log(itemlist)
        await updateDoc(IDtropa,{Item:itemlist!})
        await updateDoc(IDItem,{equipada:IDtropa.id})}
else{
  let itemlist:string[]=[]
  itemlist= (await getDoc(IDtropa)).get('Item')
 let valueremove:string|undefined=nombre
  const itemlist2=itemlist.filter(value=>{if(value==valueremove){
    valueremove=undefined
    return false
  }else return true})
  console.log(itemlist2)
  await updateDoc(IDtropa,{Item:itemlist2})
  await updateDoc(IDItem,{equipada:'0'})
}
break;
default:
  if (accion=='equipar'){
    let itemlist:string[]=[]
    itemlist= (await getDoc(IDtropa)).get('Skill')
    itemlist.push(nombre)
    await updateDoc(IDtropa,{Skill:itemlist})
    await updateDoc(IDItem,{equipada:IDtropa.id})}
else{
let itemlist:string[]=[]
let valueremove:string|undefined=nombre

itemlist= (await getDoc(IDtropa)).get('Skill')
const itemlist2=itemlist.filter(value=>{if(value==valueremove){
  valueremove=undefined
  return false
}else return true})
await updateDoc(IDtropa,{Skill:itemlist2})
await updateDoc(IDItem,{equipada:'0'})
}
break;
     
}

}
async getequipID(IDtropa:string,nombre:string){
  const q=query(collection(this.sto,localStorage.getItem('email') as string,localStorage.getItem('doc') as string,'equipo'),where('equipada','==',IDtropa),where('nombre','==',nombre))
const snap = await getDocs(q)
if(snap.docs[0]) return snap.docs[0].id
else return undefined


}

getchanguesol(){
 
  const quer=query(collection(this.sto,'solicitudes'),where('Solicitado','==',localStorage.getItem('email') ),where('estado','==','Aceptado'))
return collectionChanges(quer)

}
async getstatusplayer(player:string):Promise<boolean>{
 let fila:any=false
const quer=query(collection(this.sto,'Users'),where('email','==',player))
 
  const dat=await getDocs(quer)
  if (dat){
 fila=dat.docs[0].get('Estado') as boolean
}

return fila
}
adddocwar(ID:string,data:any){
const doc1=doc(this.sto,'Combates',ID)
const tropas2:tropaIN[]=[]
const date=new Date()
setDoc(doc1,{jugador1:data.jugador1,jugador2:data.jugador2,mapa:data.mapa})


}
addtroops(tropas:tropaIN[],jugador:string,id:string){
  var carpeta=''
  if (jugador=='jugador1')carpeta='tropas1'
  else carpeta='tropas2'
tropas.forEach((element)=>addDoc(collection(this.sto,'Combates',id,carpeta),{tropa:element}))
}
snapsol2(email:string){
  const col=collection(this.sto,'solicitudes')
  const querySolicitudes = query(col, where('Solicitante', '==', email), where('Status.Estado', '==', 'Aceptado'));
  return collectionData(querySolicitudes,{idField:'id'}) as Observable<solicitud[]>
}
snapsol1(email:string){
  const col=collection(this.sto,'solicitudes')
  const querySolicitudes = query(col, where('Solicitante', '==', email), where('Status.Estado', '==', 'WAR'));
  return collectionData(querySolicitudes,{idField:'id'}) as Observable<solicitud[]>
}
snapsol3(email:string){
  const col=collection(this.sto,'solicitudes')
  const querySolicitudes = query(col, where('Solicitado', '==', email), where('Status.Estado', '==', 'WAR'));
  return collectionData(querySolicitudes,{idField:'id'}) as Observable<solicitud[]>
}
Initwar1(tropas:tropaIN[],data:{jugador1:string,jugador2:string,mapa:string},Idmap:string,email:string){
setDoc(doc(this.sto,'Combates',Idmap),{data:data}).then(()=>{console.log('Imbecil');tropas.forEach(element=>{element.player=email;this.addtroopwar(element,Idmap)})}).catch(error=>console.log(error))
this.gettab(data.mapa).subscribe(data=>{

  data.forEach(async element=>{
   await addDoc(collection(this.sto,'Combates',Idmap,'board'),element).then(()=>{})
  })
  
})
}
Initwar2(tropas:tropaIN[],Idmap:string,email:string){

  tropas.forEach(element=>{element.player=email;this.addtroopwar(element,Idmap)})

}
addtroopwar(troop:tropaIN,Idmap:string){
  setDoc(doc(this.sto,'Combates',Idmap,'tropas',troop.id),troop)
}
async changuesol(docid:DocumentReference,Status:any,battle?:string){
await updateDoc(docid,{Status}).then(()=>{
  if (battle) updateDoc(docid,{battle:battle})
})

}
 async setchat(email1:string,email2:string,Idchat:string){
  //preparar doc
  const quer=query(collection(this.sto,'Users'),where('email','==',email1))
  const quer1=query(collection(this.sto,'Users'),where('email','==',email2))
  console.log('fase1')
  const snap1= await getDocs(quer)
  const snap2= await getDocs(quer1)
  console.log('fase2')
//preprarar datos por undefined(no chats)
let datain1
let datain2
if (!snap1.docs[0].get('chatsp')){
datain1={
  chats:[],
  chatsp:[],
  chatsj:[]
}
}else datain1={
  chats:snap1.docs[0].get('chats') as string[],
  chatsp:snap1.docs[0].get('chatsp') as string[],
  chatsj:snap1.docs[0].get('chatsj') as string[]
}
console.log('fase3')
if (!snap2.docs[0].get('chatsp')){
  datain2={
    chats:[],
    chatsp:[],
    chatsj:[]
  }
  }else datain2={
  chats:snap2.docs[0].get('chats') as string[],
  chatsp:snap2.docs[0].get('chatsp') as string[],
  chatsj:snap2.docs[0].get('chatsj') as string[]
}
console.log('fase4')
console.log(datain1)
console.log(datain2)
//modificar datos
//PLAYER1
datain1.chatsj.push('jug1')
datain1.chats.push(Idchat)
datain1.chatsp.push(email2)
//PLAYER2
datain2.chatsj.push('jug2')
datain2.chats.push(Idchat)
datain2.chatsp.push(email1)
console.log(datain1)
console.log(datain2)
console.log('fase5')
//preprarar referencias al doc
const ref1=doc(this.sto,'Users',snap1.docs[0].id)
const ref2=doc(this.sto,'Users',snap2.docs[0].id)
//updates
await updateDoc(ref1,{chatsj:datain1.chatsj,chats:datain1.chats,chatsp:datain1.chatsp})
await updateDoc(ref2,{chatsj:datain2.chatsj,chats:datain2.chats,chatsp:datain2.chatsp})
console.log('fase6')
}
async getfilas(id:number,carpeta:string){
  const col=collection(this.sto,'boards','TABLEROBASE',carpeta)
  const quer=query(col,where('id','==',id))
  
  const sanp=await getDocs(quer)
  if(sanp){
    const fila=sanp.docs[0].get('cell')
    return fila}
    
  }

creartab(carpeta:string,tablero:cell[],x:number){
const col=collection(this.sto,'Combats',carpeta,'board')

  
    addDoc(col,{id:x,tablero})
  
  console.log('tablero creado')
}
gettab(carpeta:string){
  const col=collection(this.sto,'boards','TABLEROBASE',carpeta);
  return collectionData(col,{idField:'docid'}) as Observable<fila[]>
}
gettabwar(carpeta:string){
  const col=collection(this.sto,'Combates',carpeta,'board');
  return collectionData(col,{idField:'docid'}) as Observable<fila[]>
}
clave(){
  const clave=uuid.v4()
    const claveformat ='CHA'+clave
    .replace(/-/g, '')
    return claveformat
}
enviartropa(tropa:any,player:string,IDcombat:string){
  addDoc(collection(this.sto,'Combats',IDcombat,player),tropa)
}
getropaswar(player:string,ID:string){
  return collectionData(collection(this.sto,'combats',ID,player)) as Observable<tropaIN[]>
}
changemap(carpeta:string,fila:fila){
  const col=collection(this.sto,'battle',carpeta)
const docref=doc(col,fila.docid)
setDoc(docref,fila)

}
enviasol(sol:solicitud){
  addDoc(collection(this.sto,'solicitudes'),sol)
}
}
//interfaces



export interface sobres{
  ID:number,
  tipo:string
  id?:string
}

export interface Status{
  Estado:string
  Acept1?:boolean
  Acept2?:boolean
}
export interface items{
  tipo:string,
  nombre:string,
 
  equipada:string,
  id?:string
}
export interface skill{
  tipo:string,
  nombre:string,
 id?:string,
  equipada?:string
}
export interface Users{
Estado:boolean
email:string
Helo:number
Batlle?:string[]
Battleactive:boolean
Gamesplayed:number
gamesWon:number
gameslose:number
chats:string[]
chatsj:string[]
chatsp:string[]
}
export interface sobres{
  ID:number,
  tipo:string
  id?:string
}
export interface solicitud{
  Solicitante:string
 
  Solicitado:string
 battle?:string
  mapa:string
  puntosBatalla:number
  tiempo:string
  Status?:Status
  id?:string
}
export interface boardbasic{
  back:keyof typeof back,
  id:number,
  collision?:boolean,
}
interface cambiosmapa{
  idfila:string
  idcell:number
  ID:string
}
