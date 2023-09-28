import { backs } from "../services/get-icon.service"

export interface cell{
    back:keyof typeof backs,
    collision?:boolean,
    id:string|number
    player?:string
  }
  export interface fila{
    cell:cell[]
    id:number
    docid?:string
  }
  