import { TodoRest } from "./types"

export interface FirebaseConfig {
    apiKey: string,
    authDomain: string, 
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
}
export type HandleInput = {
    serviser:string,
    sifra:string,
    naziv:string,
    kolicina:number |null,
    nalog:number | null,
    garancija:any ,
    komentar:string,
    status:string
}
export interface PropsCD  {
    changeData:any 
    dataPoint:string
    setDataPoint:React.Dispatch<React.SetStateAction<string>>
    setChangeData:React.Dispatch<React.SetStateAction<string>>
    setFiltData:React.Dispatch<React.SetStateAction<objSV[]>>
}
//datum form callback 
export interface dat {
    datum:any
}
//todo props
export interface PropsAT {
    setErrorMsg:React.Dispatch<React.SetStateAction<string>>
    setMsg:React.Dispatch<React.SetStateAction<string>>
    user:string
}
//todoRest props

export interface PropsATR {
    setErrorMsg:React.Dispatch<React.SetStateAction<string>>
    setMsg:React.Dispatch<React.SetStateAction<string>>
    user:string
    todoEdit: TodoRest
    setTodoEdit:React.Dispatch<React.SetStateAction<object>>
}
//changeData props
export interface PropsCD  {
    changeData:any 
    dataPoint:string
    setDataPoint:React.Dispatch<React.SetStateAction<string>>
    setChangeData:React.Dispatch<React.SetStateAction<string>>
    setFiltData:React.Dispatch<React.SetStateAction<objSV[]>>
    }
//
export interface objSV  {
    selectValue:string
}