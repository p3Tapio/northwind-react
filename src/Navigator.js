
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PrivateRoute from './Utils/PrivateRoute.js';
import { CustomersGet } from './customersGet';
import { LoginsGet } from './loginsGet';
import { productsGet } from './productsGet';
import {Home} from './Home';
import Login from './Login';
import { getUser, removeUserSession } from './Utils/Common';


function Navigator() {

    var logButton = "";

    const handleLogout = () => {
      removeUserSession();
      window.location.reload();
    }
  
    if (getUser() === null) logButton = <Link to={'/login'} className="nav-link">Kirjaudu</Link>;
    else if (getUser() !== null) {
      logButton = <Link to={'/'} className="nav-link" onClick={handleLogout}>Kirjaudu ulos</Link>;
    }

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <ul className="navbar-nav mr-auto">
                        <li><Link to={'/'} className="nav-link">Etusivu</Link></li>
                        <li><Link to={'/customers'} className="nav-link">Asiakkaat</Link></li>
                        <li><Link to={'/products'} className="nav-link">Tuotteet</Link> </li>
                        <li><Link to={'/logins'} className="nav-link">Käyttäjät</Link> </li>
                        <li>{logButton}</li>
                        <li></li>
                    </ul>
                </nav>
                <hr />
                <Switch>
                    <Route exact path ='/' component={Home}/>
                    <PrivateRoute path='/customers' component={CustomersGet} />
                    <PrivateRoute path='/products' component={productsGet} />
                    <PrivateRoute path='/logins' component={LoginsGet} />
                    <Route path='/Login' component={Login} />
                </Switch>
            </div>
        </Router>
    );
}

export default Navigator; 