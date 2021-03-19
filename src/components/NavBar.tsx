import React from 'react'
import { Link } from 'react-router-dom'
import  SettingsImage from '../img/settings.png'
import firebase from '../db/config'
import logg from '../AuthComponent/LoggedIn'
import  logoutImg from '../img/logout.png'
require('firebase/auth')

const NavBar = () => { 
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark justify-content-center" id='navBar'>
        <Link className="navbar-brand" to='/' id='logo'><b>G</b>Servis-IVAN</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" id='navBtn' ><span className="navbar-toggler-icon" ></span></button>
        <div className="collapse navbar-collapse justify-content-end " id="collapsibleNavbar">
          {logg() ? ( 
          <ul className='navbar-nav '>
            <li className="nav-item"><Link className="nav-link" to='/'>Unos naloga</Link></li>
            <li className="nav-item dropdown" >
              <Link to='/#'  className="dropdown-toggle nav-link" id="navbardrop" data-toggle="dropdown">
                Tabele
              </Link>
              <div className="dropdown-menu" >
                <Link  to='/pretraga'  className="nav-link">Promena podataka</Link>
                <Link  to='/dnevniPodaci'  className="nav-link">Dnevni podaci</Link>
                <Link  to='/mesecniPodaci' className='nav-link li-text'>Mesecni podaci</Link>
                <Link  to='/sviPodaci' className='nav-link li-text'>Svi podaci</Link>
                <Link  to='/obrisiNalog'  className="nav-link">Obriši nalog</Link>
                <Link  to='/obrisiPodatke'  className="nav-link">Obriši podatke</Link>
              </div>
            </li>
            <li className="nav-item  dropdown">
              <Link to={'/#'} className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                Podsetnici
              </Link>    
              <div className="dropdown-menu" >
                <Link  to='/podsetnik' className='nav-link li-text'>Podsetnik - stranke</Link>
                <Link  to='/podsetnikOstalo' className='nav-link li-text'>Podsetnik - ostalo</Link>
              </div> 
            </li>
            <li className="nav-item  dropdown">
              <Link to={'/#'} className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                Uvezene tabele
              </Link>    
              <div className="dropdown-menu" >
                <Link  to='/promeneUvezenihPodataka' className='nav-link li-text'>Promena podataka</Link>
                <Link  to='/ucitajPodatke' className='nav-link li-text'>Učitaj tabelu</Link>
                <Link  to='/sviUvezeniPodaci'  className="nav-link">Svi uvezeni podaci</Link>
                <Link  to='/proveraDelova'  className="nav-link">Provera delova</Link>
                <Link  to='/obrisiUvezenePodatke'  className="nav-link">Obriši podatke</Link>
                <div className="dropdown-divider"></div>
                <Link  to='/promenaPodatakaBulevar'  className="nav-link">Magacin Bulevar - promena</Link>
                <Link  to='/podaciBulevar'  className="nav-link">Magacin Bulevar</Link>
                <Link  to='/bulevarBrisanje'  className="nav-link">Magacin Bulevar - Brisanje</Link>
              </div> 
            </li>
            <li className="nav-item  dropdown">
              <Link to={'/#'}  className="nav-link dropdown-toggle calcPrice" href="#" id="navbardrop" data-toggle="dropdown">
                Kalkulacija cena
              </Link>    
              <div className="dropdown-menu" >
                <Link  to='/kalkulacijaCena' className='nav-link li-text'>Izračunaj MP cenu</Link>
                <Link  to='/korekcijaCena' className='nav-link li-text'>Izmeni cene</Link>
              </div> 
            </li>
            <li className="nav-item dropdown">
              <Link to={'/#'} className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                Podešavanja <img src={SettingsImage} id='img-set' alt='settings-img'/>
              </Link>
              <div className="dropdown-menu">
              <Link to='/noviServiser' className="nav-link">Novi serviser</Link>
              <Link to='/obrisiServisera' className="nav-link">Obriši servisera</Link> 
                <div className="dropdown-divider"></div>
                <Link to={'/#'} id='logoutImg'  className='nav-link login' onClick={(e)=>{
                    e.preventDefault()
                    const auth =firebase.auth() 
                    auth.signOut().then(()=>{
                    localStorage.removeItem('user')
                    window.location.reload(false)
                    })
                  }}>Odjavi se {} 
                  <img id='logoutImg' style={{width:'17px'}} src={logoutImg} alt='logout'/>
                </Link>              
              </div>
            </li>
          </ul>):
         (<ul className="nav navbar-nav navbar-right">
            {logg() ? (null):(<><li><Link to='/prijava' className='nav-link login'>Prijavi se</Link></li> <li><Link to='/registracija' className='nav-link login'>Registracija</Link></li></>)}
          </ul>)}
        </div>
    </nav>
  )
}
export default NavBar

