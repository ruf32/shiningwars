import { Injectable } from '@angular/core';
import {onSnapshot,Firestore,addDoc,collection,collectionData, query,docData, getDocs,collectionChanges, where, doc,updateDoc, deleteDoc, getDoc, QuerySnapshot, DocumentReference, DocumentSnapshot, docSnapshots, setDoc} from'@angular/fire/firestore'
import { Observable } from 'rxjs';
import { SobresService } from './sobres.service';
import { back, casilla} from '../objetos/Board';
import * as uuid from 'uuid';
import { cell, fila } from '../interfaces/cell';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private sto:Firestore,private sobre:SobresService) { }
  //funcion crear documentos y librerias iniciales

  async createinit(email:string){

    let docref=collection(this.sto,email);
     const doc= await addDoc(docref,{Gamesplayed:0,gamesWon:0,gamesLose:0,chats:[],chatsp:[],chatsj:[]});
    const init=[
      {ID:0,tipo:'Initial'},
      {Nombre:'Peasant',BattlePoints:10,ATK:0,DEF:[0],VEL:0,MOV:1,PV:100,PM:0,ARMA:'noArma',ARMADURA:'noArmadura',Item:[],Skill:[]},
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
    addDoc(collection(this.sto,'Users'),{Gamesplayed:0,gamesWon:0,gameslose:0,Helo:0,email:email,Estado:false})
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
getropas():Observable<tropas[]>{
  const subCollectionRef = collection(this.sto,localStorage.getItem('email')as string,localStorage.getItem('doc')as string, 'tropas');
  return collectionData(subCollectionRef,{idField:'id'}) as Observable<tropas[]>
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
async getactivetroops(){
  const activas:tropas[]=[]
  try {
    const q = query(collection(this.sto,localStorage.getItem('email')as string,localStorage.getItem('doc')as string,'tropas'), where('activa', '==', true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const tropa = doc.data();
        activas.push(tropa as tropas);
      });
    return activas;
    } catch (error) {
      console.error('Error al buscar tropas activas:', error);
      return [];
    }
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
await updateDoc(IDtropa,{ARMA:nombre})
  }else {
    await updateDoc(IDItem,{equipada:0})
    await updateDoc(IDtropa,{ARMA:'noArma'})
}
break;
case 'Armadura':
  
  if (accion=='equipar'){
    await updateDoc(IDItem,{equipada:IDtropa.id})
    await updateDoc(IDtropa,{ARMADURA:nombre})
      }else {
        await updateDoc(IDItem,{equipada:0})
        await updateDoc(IDtropa,{ARMADURA:'noArma'})
    } 
    break;
    case 'Item':
      if (accion=='equipar'){

     
}
}
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
const tropas2:tropas[]=[]
const date=new Date()
setDoc(doc1,{jugador1:data.jugador1,jugador2:data.jugador2,mapa:data.mapa})


}
addtroops(tropas:tropas[],jugador:string,id:string){
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
async changuesol(docid:DocumentReference,Status:any){
await updateDoc(docid,{Status})
}
 async setchat(email1:string,email2:string,Idchat:string){
  //preparar doc
  const quer=query(collection(this.sto,'Users'),where('email','==',email1))
  const quer1=query(collection(this.sto,'Users'),where('email','==',email2))
  const snap1= await getDocs(quer)
  const snap2= await getDocs(quer1)
//preprarar datos por undefined(no chats)
let datain1
let datain2
if (!snap1.docs[0].get('chatsp')){
datain1={
  chats:[],
  chatsp:[],
  chatj:[]
}
}else datain1={
  chats:snap1.docs[0].get('chats') as string[],
  chatsp:snap1.docs[0].get('chatsp') as string[],
  chatj:snap1.docs[0].get('chatj') as string[]
}
if (!snap2.docs[0].get('chatsp')){
  datain2={
    chats:[],
    chatsp:[],
    chatj:[]
  }
  }else datain2={
  chats:snap2.docs[0].get('chats') as string[],
  chatsp:snap2.docs[0].get('chatsp') as string[],
  chatj:snap2.docs[0].get('chatj') as string[]
}
//modificar datos
//PLAYER1
datain1.chatj.push('jug1')
datain1.chats.push(Idchat)
datain1.chatsp.push(email2)
//PLAYER2
datain2.chatj.push('jug2')
datain2.chats.push(Idchat)
datain2.chatsp.push(email1)
//preprarar referencias al doc
const ref1=doc(this.sto,'Users',snap1.docs[0].id)
const ref2=doc(this.sto,'Users',snap2.docs[0].id)
//updates
await updateDoc(ref1,{chatj:datain1.chatj,chats:datain1.chats,chatsp:datain1.chatsp})
await updateDoc(ref2,{chatj:datain2.chatj,chats:datain2.chats,chatsp:datain2.chatsp})
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
  const col=collection(this.sto,'Combats',carpeta,'board');
  return collectionData(col,{idField:'docid'})
}
gettabbase(carpeta:string){
  const col=collection(this.sto,'boards','TABLEROBASE',carpeta);
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
  return collectionData(collection(this.sto,'combats',ID,player)) as Observable<tropas[]>
}
changemap(carpeta:string,fila:fila){
  const col=collection(this.sto,'battle',carpeta)
const docref=doc(col,fila.docid)
setDoc(docref,fila)

}
}
//interfaces



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
  ARMA:string,
  ARMADURA:string,
  ITEM1:string[],
  SKILL1:string[],
  id:string,
  funci?:Function[]
}
export interface Status{
  Estado:string
  Acept1?:boolean
  Acept2?:boolean
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
  SKILL1?:string|null,
  equipada:string,
  id?:string
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
  equipada:string
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
chatj:string[]
chatsp:string[]
}
export interface sobres{
  ID:number,
  tipo:string
  id?:string
}
export interface solicitud{
  Solicitante:string
 STATU:boolean;
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
