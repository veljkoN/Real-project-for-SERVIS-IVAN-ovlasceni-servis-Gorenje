let validateCheck: (item:any) => true | undefined
export let errorM:string
validateCheck = (item) => {
    let sifra = document.querySelector('#sifra') as HTMLInputElement
    let kolicina = document.querySelector('#kolicina') as HTMLInputElement
    let nalog = document.querySelector('#nalog') as HTMLInputElement
    let serviser = document.querySelector('#serviser') as HTMLInputElement
    let naziv = document.querySelector('#naziv') as HTMLInputElement
    let garancija1 = document.querySelector('#garancija1') as HTMLInputElement
    let garancija2 = document.querySelector('#garancija2') as HTMLInputElement
    let komentar = document.querySelector('#komentar') as HTMLInputElement
    if(item.sifra !==''){
        sifra.style.border='1px solid lightgray'
        if(Number(item.kolicina) && item.kolicina >0){
            kolicina.style.border='1px solid lightgray'
            if(Number(item.nalog) && item.nalog >0){
                nalog.style.border='1px solid lightgray'
                sifra.value=''
                kolicina.value=''
                nalog.value=''
                serviser.value=''
                naziv.value=''
                garancija1.checked=false
                garancija2.checked=false
                komentar.value=''
                return true
            }
            else{
            nalog.style.border='1px solid red'
            errorM = 'Polje nalog mora biti popunjeno'
            }
        }
        else{
            kolicina.style.border='1px solid red'
            errorM = 'Polje količina mora biti popunjeno'
        }
    }
    else{
        sifra.style.border='1px solid red'
        errorM = 'Šifra mora biti popunjeno'
    }
}
    
export default validateCheck