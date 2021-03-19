export let errorM=''
const validateEmail=(email)=> {
    let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return re.test(email)
} 
const validateSignUp = (person) => {
    let name = document.querySelector('#firstName') 
    let surname = document.querySelector('#lastName') 
    let pwd = document.querySelector('#pwd') 
    let email = document.querySelector('#email')  
    if(person.firstName !=='' && person.firstName.length>3 && person.firstName.length<15){
        name.style.border='1px solid lightgray'
        if(person.lastName !=='' && person.lastName.length>3 && person.lastName.length<15){
            surname.style.border='1px solid lightgray'
            if(person.pwd!=='' && person.pwd.length>5 && person.pwd.length<16){
                pwd.style.border='1px solid lightgray'
                if(validateEmail(person.email)){
                    email.style.border='1px solid lightgray'
                        errorM = ''
                        return true
                }
                else{
                    email.style.border='1px solid red'
                    errorM = '* E-mail forma nije validna'
                }
            }
            else{
                pwd.style.border='1px solid red'
                errorM = '* Šifra mora biti najmanje 6 karaktera (najviše 16 karaktera)'
            }
        }
        else{
            surname.style.border='1px solid red'
            errorM = '* Prezime mora biti dugačko između 4 i 15 karaktera'
        }
    }
    else{
        name.style.border='1px solid red'
        errorM = '* Ime mora biti dugačko između 4 i 15 karaktera'
    }
}
export default validateSignUp