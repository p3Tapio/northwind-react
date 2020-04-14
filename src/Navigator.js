
import React from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import PrivateRoute from './Utils/PrivateRoute.js';
import { CustomersGet } from './customersGet';
import { LoginsGet } from './loginsGet';
import { productsGet } from './productsGet';
import { Home } from './Home';
import Login from './Login';
import { getUser, removeUserSession } from './Utils/Common';


function Navigator() {

    var logButton = "";
    var logPath = "";

    const handleLogout = () => {
        removeUserSession();
        window.location.reload();
    }

    if (getUser() === null) {
        logButton = <Link to={'/login'} className="nav-link">Kirjaudu</Link>;
        logPath = <Route path='/login' component={Login} />;
    }
    else if (getUser() !== null) {
        logButton = <Link to={'/'} className="nav-link" onClick={handleLogout}>Kirjaudu ulos</Link>;
        logPath = <Route exact path='/' component={Home} />
    }

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse show" id="navbarColor02" >
                        <ul className="navbar-nav mr-auto">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to='/' className="nav-link">Etusivu</Link></li>
                                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to='/customers' className="nav-link">Asiakkaat</Link></li>
                                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to='/products' className="nav-link">Tuotteet</Link> </li>
                                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to='/logins' className="nav-link">Käyttäjät</Link> </li>
                                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">{logButton}</li>
                            </ul>
                        </ul>
                    </div>
                </nav>


                <Switch>
                    <Route exact path='/' component={Home} />
                    <PrivateRoute path='/customers' component={CustomersGet} />
                    <PrivateRoute path='/products' component={productsGet} />
                    <PrivateRoute path='/logins' component={LoginsGet} />

                    {logPath}
                </Switch>

            </div>
        </Router>
    );
}

export default Navigator;

