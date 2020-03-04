import React from 'react';
export class NavBar extends React.Component {
    render() {
        
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>   
                <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <a className="nav-link" href="./">Etusivu</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="./">Asiakkaat</a>
                    </li> 
                </ul>
                </div>
          </nav>
        );
    }
}