
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { getUser, removeUserSession } from './Utils/Common';

export class Home extends Component {
    render() {
        var logButton = "";

        const handleLogout = () => {
            removeUserSession();
            window.location.reload();
        }

        if (getUser() === null) {
            logButton = <Link to={'/login'} className="btn btn-outline-success btn-lg">Kirjaudu</Link>;
        }
        else if (getUser() !== null) {
            logButton = <Link to={'/'}className="btn btn-outline-success btn-lg" onClick={handleLogout}>Kirjaudu ulos</Link>;
        }


        const style = {
            margin: "auto",
            width: "50%"
        };
        return (
            <div className="container">

                <div className="jumbotron" style={style}>
                    <h3 className="display-3">Northwind-React!</h3>
                    <p className="lead"></p>
                    <hr className="my-4" />
                    <p className="lead"> CRUD-toiminnot Northwind-tietokannan customers ja products -tauluihin, sekä käyttäjätietoihin.</p>
                    <p>Sovelluksen käyttö edellyttää kirjautumista. Järjestelmästä voi poistua kirjauduttuasi klikkaamalla navigaatio-palkin kohtaa kirjaudu ulos.<br /><br />
                        Ulkoasun toteutuksessa on hyödynnetty  <a href="https://bootswatch.com/">Bootswatchin</a> Solar-teemaa.
                    </p>
                    <hr />
                   {logButton}
                </div>
            </div>
        )
    }
}
