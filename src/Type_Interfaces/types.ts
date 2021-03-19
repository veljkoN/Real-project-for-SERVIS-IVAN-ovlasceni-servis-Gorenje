//handle submit
export type handleS = (e:React.FormEvent<HTMLFormElement>)=>void
//new todo
export type Todo = {
    name:string
    title:string  
    phone:string
    completed:boolean
}
export type TodoRest = {
    id?:any
    completed: boolean
    datum: string
    datumItem: string
    korisnik: string
    title: string
    marked:boolean
}
//style todoRest
export type TDRstyleM = {
    border:string
    borderRadius:string
    
}
//objectfrom CalculatePriceCheck
export type itemOBJ ={
    sifra:string,
    kolicina:number
}
export type ObjectLS = {
    id?:string
    Cena: number
    Materijal: string
    Naziv: string
    Valuta: string
}
export type itemsOBJ = {
id?:string
Cena: number
sifra: string
Naziv: string
kolicina?:number 
MCena?:number 
Valuta: string

}
//object to localCompare
export type obj = {datumItem:string}
//style table
export type BCstyle = { backgroundColor:string }
//style tod
export type TDStyle = { textDecoration:string, opacity:string }
//data in promise
export type Data = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
//snapShot
export type Doc = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
//Database
export type DB = firebase.firestore.Firestore
//snapshot
export type SnSh = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
//doc get/then
export  type DocGT = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
//doc get/then one document
export type DocGTItem = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
//Msg for changeData
export type Msg = (a:string,b:string)=>string
//doc for userInfo
export type docUI = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
//handleChangeCD for changeData
export type handleChangeCD = (e:React.FormEvent<HTMLFormElement>,id:string,dataPoint:string)=> void 
//handleClick from DailyData
export type handleCL = (e:React.FormEvent<HTMLFormElement>,dateCurr:string) =>void
//handleSelect from SearchItem
export type handleSC = (e: React.FormEvent<HTMLSelectElement>) =>void
//handleFileSelect from UploadFile
export type handleFS = (e:React.ChangeEvent<HTMLInputElement>) => void
//hadleSLI from login
export type handleSLI = (e:React.FormEvent<HTMLFormElement>) => void
//AddDataToDatabase from UploadFile
export type addDataTDB = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
//handleClick without par
export type HC = () =>void
//handleCheck
export type handleCheck = (e: React.FormEvent<HTMLInputElement>, id: string) => void
//Delete todo form Todo
export type deleteT =  (id: string) => void
//Edit todo from TodoRest
export type  handleEditTR = (id: string) => void
//DeleteMonth from DeleteData
export type  DeleteMO = (monCurr: number, yearCurr: string) => void
//handelClickDD
export type HandleCLDD = (monCurr: string, yearCurr: string) => void
//deleteItem form DeleteItem
export type  DeleteI = (id: string) => void
//delete from worker
export type DeleteO =  (id: string, name: string) => () => void
//handleChange from modalBootstrap
export type HandleCH = (e: React.FormEvent<HTMLFormElement>, id: string, dataPoint: string) => void
//handleClickMonth from monthData
export type HandleCLMD =  (monCurr: string, yearCurr: string) => void
//downHandler on press key from calculatePrice
export type HandleDCP =  (e:KeyboardEvent) => void
//handleChange form calculatePrice
export type handleChangeCP = (e:React.ChangeEvent<HTMLInputElement>) =>void
//devTen form calculatePrice
export type devidTenCP = (price:number,rest:number) =>number
//devTen form calculatePrice
export type calculateCP = (price:number) =>number|undefined
//handelsubmti from calculateprice
export type handleSubmitCP = (e:React.FormEvent<HTMLFormElement>)=>void

