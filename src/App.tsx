import React from 'react';
import AddItem from './components/AddItem';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchItem from './components/SearchItem';
import AllData from './components/AllData';
import DeleteItem from './components/DeleteItem';
import TodoList from './components/TodoList';
import TodoListRest from './components/TodoListRest';
import DailyData from './components/DailyData';
import NewWorker from './components/NewWorker';
import DeleteWorker from './components/DeleteWorker';
import Signup from './AuthComponent/Signup';
import Login from './AuthComponent/Login';
import UserInfo from './components/UserInfo';
import MonthData from './components/MonthData';
import DeleteData from './components/DeleteData';
import ChangeUpdateData from './components/ChangeUpdateData';
import AllUploadData from './components/AllUploadingData';
import DeleteUplodingData from './components/DeleteUplodingData';
import UploadFile from './components/UploadFile';
import CheckItems from './components/CheckItems';
import Bulevar from './components/Bulevar';
import ChangeBulevar from './components/ChangeBulevar';
import DeleteBulevar from './components/DeleteBulevar';
import CalculatePriceCheck from './components/CalculatePriceCheck';
import CalculatePriceEmail from './components/CalculatePriceEmail';
import DepoTemplate from './components/DepoTemplate';
import ResTemplate from './components/ResTemplate';
import AddWorkerBulevar from './components/AddWorkerBulevar';
  
const  App = () => {
  return (
    <div className="App container-fluid">
      <Router>
        <UserInfo/>  
        <NavBar/>
        <Switch> 
          
          <Route path='/registracija' exact component={Signup}/>
          <Route path='/prijava' exact component={Login}/>
          <Route path='/pretraga' exact component={SearchItem} />
          <Route path='/sviPodaci' exact component={AllData} />
          <Route path='/mesecniPodaci' exact component={MonthData}/>
          <Route path='/dnevniPodaci' exact component={DailyData} />
          <Route path='/podsetnik' exact component={TodoList} />
          <Route path='/podsetnikOstalo' exact component={TodoListRest} />
          <Route path='/obrisiNalog' exact component={DeleteItem}/>
          <Route path='/noviServiser' exact component={NewWorker}/>
          <Route path='/obrisiServisera' exact component={DeleteWorker}/>
          <Route path='/obrisiPodatke' exact component={DeleteData}/>
          <Route path='/ucitajPodatke' exact component={UploadFile}/>
          <Route path='/promeneUvezenihPodataka' exact component={ChangeUpdateData}/>
          <Route path='/sviUvezeniPodaci' exact component={AllUploadData}/>
          <Route path='/proveraDelova' exact component={CheckItems}/>
          <Route path='/obrisiUvezenePodatke' exact component={DeleteUplodingData}/>
          <Route path='/proveraDelova' exact component={CheckItems}/>
          <Route path='/podaciBulevar' exact component={Bulevar}/>
          <Route path='/promenaPodatakaBulevar' exact component={ChangeBulevar}/>
          <Route path='/bulevarBrisanje' exact component={DeleteBulevar}/>
          <Route path='/kalkulacijaCena' exact component={CalculatePriceEmail}/>
          <Route path='/korekcijaCena' exact component={CalculatePriceCheck}/>
          <Route path='/depozit' exact component={DepoTemplate} /> 
          <Route path='/prijemnica' exact component={ResTemplate} />
          <Route path='/noviRadnik' exact component={AddWorkerBulevar} />
          <Route path='/' exact component={AddItem} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
