
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CustomersGet } from './customersGet';
import { LoginsGet } from './loginsGet';


class Navigator extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to = {'/'} className="nav-link">Asiakkaat</Link></li>
                            <li><Link to = {'/logins'} className="nav-link">Käyttäjät</Link> </li>
                        </ul>
                    </nav>
                    <hr/>
                    <Switch>
                        <Route exact path='/' component = {CustomersGet}/>
                        <Route path = '/logins' component = {LoginsGet}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default Navigator; 