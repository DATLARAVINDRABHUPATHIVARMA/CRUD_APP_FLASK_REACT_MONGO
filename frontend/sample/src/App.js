import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import React from 'react';
import HeaderComponent from './Components/HeaderComponent';
import ListUserComponent from './Components/ListUserComponent';
import CreateUserComponent from './Components/CreateUserComponent';
import ViewUserComponent from './Components/ViewUserComponent';
import UpdateUserComponent from './Components/UpdateUserComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent/>
        <div className='container'>
          <Switch>
            <Route path='/' exact component={ListUserComponent}></Route>  
            <Route path='/users' exact component={ListUserComponent}></Route>
            <Route path='/add-user/:id' exact component={CreateUserComponent}></Route>
            <Route path='/view-user/:id' exact component={ViewUserComponent}></Route>
            {<Route path='/update-user/:id' exact component={UpdateUserComponent}></Route>}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
