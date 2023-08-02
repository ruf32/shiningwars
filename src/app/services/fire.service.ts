import { Injectable } from '@angular/core';
import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut} from '@angular/fire/auth';
import {Firestore,addDoc,DocumentReference,collection,collectionData, query,getDocs,DocumentData, where, doc,updateDoc, deleteDoc, getDoc, QuerySnapshot} from'@angular/fire/firestore'
import { Users, formulario, items, skill, sobres, tropas,cell, solicitud } from '../components/interfaces/inter';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FireService {
email:string='';
docID:string=''
fila:cell[]=[]
  constructor(private auth:Auth,private sto:Firestore) { }
register(form:formulario){
return createUserWithEmailAndPassword(this.auth,form.email,form.pass)
}
async login(form:formulario){
  localStorage.setItem('email',form.email);
  await this.getdocID(form.email);
 
  return signInWithEmailAndPassword(this.auth,form.email,form.pass)
}
logout(){
  localStorage.clear();
  return signOut(this.auth);
}
  async createinit(){
var docref=collection(this.sto,this.email);
 const doc= await addDoc(docref,{Gamesplayed:0,gamesWon:0,gamesLose:0});

 this.docID=doc.id
docref=collection(this.sto,this.email+'/'+this.docID+'/sobres')
addDoc(docref,{ID:0,tipo:'Initial'})
addDoc(docref,{ID:1,tipo:'Initial'})
docref=collection(this.sto,this.email,this.docID,'tropas')

addDoc(docref,{
  Nombre:'Peasant',
  BattlePoints:10,
  FUE:0,
  DEF:0,
  VEL:0,
  MOV:1,
  PV:100,
  PM:0,
  ARMA:null,
  ARMADURA:null,
  ITEM1:null,
  SKILL1:null
})
docref=collection(this.sto,this.email,this.docID,'equipo')
addDoc(docref,{
  tipo:'Arma',
  nombre:'palo',
  FUE:1,
  }
  )
addDoc(docref,{
    tipo:'Item',
    nombre:'Pocion PV pequeña',
    PV:30
})
docref=collection(this.sto,this.email,this.docID,'Habilidades')
addDoc(docref,{
  tipo:'Cuerpo',
  nombre:'Carga',
  FUE:2,
  MOV:2,
  REUSE:5
  })
  addDoc(collection(this.sto,'Users'),{Gamesplayed:0,gamesWon:0,gameslose:0,Helo:0,email:this.email,Estado:false})
}
async changestatusoff(){
  const userQuery=query(collection(this.sto,'Users'),where ('email','==',localStorage.getItem('email') as string))
 const snap=await getDocs(userQuery);
 if(snap.docs[0].id){
  const userdoc=snap.docs[0].id ;

const col=collection(this.sto,'Users')
  const docrf=doc(col,userdoc)
  await updateDoc(docrf,{Estado:false})
  }
}
async changueStatusOn(){
  const email= localStorage.getItem('email')as string
  const userQuery=query(collection(this.sto,'Users'),where ('email','==',localStorage.getItem('email') as string))
 const snap1=await getDocs(userQuery);
 if(snap1.docs[0]){
  const userdoc=snap1.docs[0].id ;

  const docrf=doc(collection(this.sto,'Users'),userdoc)
  await updateDoc(docrf,{Estado:true})
  }
}
async getdocID(email:string){
  const userQuery=query(collection(this.sto,email))
 const snap=await getDocs(userQuery);
 if(snap){
  const userdoc=snap.docs[0];
  this.docID=userdoc.id
   localStorage.setItem('doc',userdoc.id)
  }
}
setemail(params:string){
  this.email=params
}
getemail(){
  return this.email
}
getUsers():Observable<Users[]>{
const col=collection(this.sto,'Users')
return collectionData(col,{idField:'id'}) as Observable<Users[]>
}
 getSobres():Observable<sobres[]>{
  const email= localStorage.getItem('email')as string
  const docid=localStorage.getItem('doc') as string
  const subCollectionRef = collection(this.sto,email, docid, 'sobres');
  return collectionData(subCollectionRef,{idField:'id'}) as Observable<sobres[]>
}
getropas():Observable<tropas[]>{
  const email= localStorage.getItem('email')as string
  const docid=localStorage.getItem('doc') as string
  const subCollectionRef = collection(this.sto,email, docid, 'tropas');
  return collectionData(subCollectionRef,{idField:'id'}) as Observable<tropas[]>
}
getitems():Observable<items[]>{
  const email= localStorage.getItem('email')as string
  const docid=localStorage.getItem('doc') as string
  const subCollectionRef = collection(this.sto,email, docid, 'equipo');
  return collectionData(subCollectionRef,{idField:'id'}) as Observable<items[]>
}
getSkills():Observable<skill[]>{
  const email= localStorage.getItem('email')as string
  const docid=localStorage.getItem('doc') as string
  const subCollectionRef = collection(this.sto,email, docid, 'Habilidades');
  return collectionData(subCollectionRef,{idField:'id'}) as Observable<skill[]>
}
async getactivetroops(){
const activas:tropas[]=[]
const email= localStorage.getItem('email')as string
const docid=localStorage.getItem('doc') as string
try {
  const q = query(collection(this.sto,email,docid ,'tropas'), where('activa', '==', true));
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
 async changuetroopact(troop:string,activa:boolean){
  const email= localStorage.getItem('email')as string
  const docid=localStorage.getItem('doc') as string
 const collec= collection(this.sto,email,docid,'tropas')
  const docref=doc(collec,troop)

 if (activa ) await updateDoc(docref,{activa:false});
 else await updateDoc(docref,{activa:true})
}
openSobre(sob:sobres){
  var cards=0;
  var result=0;
  const email=localStorage.getItem('email') as string
  const doc1=localStorage.getItem('doc')as string;
  const col=collection(this.sto,email,doc1,'sobres')
const docref= doc(col,sob.id);
switch(sob.tipo){
  case 'Initial' :cards=8;break;
}
for(let c=0;c<cards;c++){
switch(c){
  case 1|2|3:
    const x=Math.random()*100
if(x<20) result=1
if ((x>=20)&&(x<40)) result=2
if ((x>=40)&&(x<60)) result=3
if ((x>=60)&&(x<80)) result=4
if ((x>=80)&&(x<90)) result=5
if (x>=90) result=6
}

}
deleteDoc(docref)
}
addboard(cell:cell[],idfila:number,carpeta:string){
addDoc(collection(this.sto,'boards','TABLEROBASE',carpeta),{id:idfila,cell})
} 
async getfilas(id:number,carpeta:string){
const col=collection(this.sto,'boards','TABLEROBASE',carpeta)
const quer=query(col,where('id','==',id))

const sanp=await getDocs(quer)
if(sanp){
  this.fila=sanp.docs[0].get('cell')}
  return this.fila
}
getf(){
  return this.fila;
}
async getsolicitudes(email:string){
  const col= collection(this.sto,'solicitudes')
  const quer=query(col,where('Solicitado','==',email))
 const snap=await  getDocs(quer)
 console.log
 var ee:solicitud[]=[]
 if (snap){
  snap.forEach((doc) => {
    const tropa = doc.data();
    ee.push(tropa as solicitud);
  }
  );
  return ee
 }else return []
}
}










