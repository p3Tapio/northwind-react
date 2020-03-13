
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CustomersGet } from './customersGet';
import { LoginsGet } from './loginsGet';
import { productsGet } from './productsGet';
import Login from './Login';



class Navigator extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to = {'/'} className="nav-link">Asiakkaat</Link></li>
                            <li><Link to = {'/products'} className="nav-link">Tuotteet</Link> </li>
                            <li><Link to = {'/logins'} className="nav-link">Käyttäjät</Link> </li>
                            <li><Link to={'/Login'} className="nav-link">Kirjaudu</Link></li>
                            <li></li>
                        </ul>
                    </nav>
                    <hr/>
                    <Switch>
                        <Route exact path='/' component = {CustomersGet}/>
                        <Route path = '/products' component = {productsGet}/>
                        <Route path = '/logins' component = {LoginsGet}/>
                        <Route path='/Login' component={Login} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default Navigator; 