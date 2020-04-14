
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Home extends Component {
    render() {
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
                    <p>Sovelluksen käyttö edellyttää kirjautumista. Järjestelmästä voi poistua kirjauduttuasi klikkaamalla navigaatio-palkin kohtaa kirjaudu ulos.<br/><br/>
                    Ulkoasun toteutuksessa on hyödynnetty  <a href="https://bootswatch.com/">Bootswatchin</a> Solar-teemaa.
                    </p>
                    <hr/>
                    <Link to={'/login'} className="btn btn-outline-success btn-lg">Kirjaudu</Link>
                </div>
            </div>
        )
    }
}
