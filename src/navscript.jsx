import React from 'react';
import { App } from './App.jsx'

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }
    handleClickNav = (event) => {
        this.setState({ content: event.target.value });
    }
    render() {
        var contentToRender = <App content={this.state.content} />;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <button eventKey="1" onClick={this.handleClickNav} value="LoginsGet" className="btn btn-outline-secondary btn-sm">Tunnukset</button>
                            </li>
                            <li className="nav-item">
                                <button eventKey="2" onClick={this.handleClickNav} value="CustomersGet" className="btn btn-outline-secondary btn-sm">Asiakkaat</button>
                            </li>
                        </ul>
                    </div>
                </nav>
                {contentToRender}
            </div>
        );
    }
}
