let date=new Date()
//dan
let zeroM;
        if(date.getMonth()+1<10){
            zeroM=0;
        }
        else{
            zeroM=''
        }
let zeroD;
if(date.getDate()<10){
    zeroD=0;
}
else{
    zeroD=''
}
const datumItem = `${zeroD}${date.getDate()}-${zeroM}${date.getMonth()+1}-${date.getFullYear()}`
//mesec
const month =date.getMonth()
let mesec=''
switch (month) {
    case 0:
        mesec='Januar'
        break;
    case 1:
        mesec='Februar'
        break;
    case 2:
        mesec='Mart'
        break;
    case 3:
        mesec='April'
        break;
    case 4:
        mesec='Maj'
        break;
    case 5:
        mesec='Jun'
        break;
    case 6:
        mesec='Jul'
        break;
    case 7:
        mesec='Avgust'
        break;
    case 8:
        mesec='Septembar'
        break;
    case 9:
        mesec='Oktobar'
        break;
    case 10:
        mesec='Novembar'
        break;
    case 11:
        mesec='Decembar'
        break;
    default:
        break;
}
//godina
const godina = date.getFullYear()
export const getM = (mon:any) => {
    let mesec  = ''
    switch (mon) {
        case 0:
            mesec='Januar'
            break;
        case 1:
            mesec='Februar'
            break;
        case 2:
            mesec='Mart'
            break;
        case 3:
            mesec='April'
            break;
        case 4:
            mesec='Maj'
            break;
        case 5:
            mesec='Jun'
            break;
        case 6:
            mesec='Jul'
            break;
        case 7:
            mesec='Avgust'
            break;
        case 8:
            mesec='Septembar'
            break;
        case 9:
            mesec='Oktobar'
            break;
        case 10:
            mesec='Novembar'
            break;
        case 11:
            mesec='Decembar'
            break;
        default:
            break;
    }
    return mesec
}
//update file
const  ExcelDateToJSDate = (date:any) => {
    let forDat:any = new Date(Math.round((date - 25569)*86400*1000))
    return forDat
  }
  const showDate = (dateS:any) => {
    const date = new Date(ExcelDateToJSDate(dateS))

    let newDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`.split(" ")
    return newDate[0]
}
//set good date
const showDateDepo = (date:string) => {
    let day = date.slice(0,2)
    const mon = date.slice(3,5)
    const year =  date.slice(6,10)
    let mesec = ''
    switch (mon) {
        case '01':
            mesec='Januar'
            break;
        case '02':
            mesec='Februar'
            break;
        case '03':
            mesec='Mart'
            break;
        case '04':
            mesec='April'
            break;
        case '05':
            mesec='Maj'
            break;
        case '06':
            mesec='Jun'
            break;
        case '07':
            mesec='Jul'
            break;
        case '08':
            mesec='Avgust'
            break;
        case '09':
            mesec='Septembar'
            break;
        case '10':
            mesec='Oktobar'
            break;
        case '11':
            mesec='Novembar'
            break;
        case '12':
            mesec='Decembar'
            break;
        default:
            break;
    }
    if(date.slice(0,1)==='0'){
        day = day.slice(1,2)
    }
   
    let fullYear = `${day}. ${mesec} ${year}. godine`
    return fullYear

}
export {mesec, godina, datumItem, showDate, showDateDepo }