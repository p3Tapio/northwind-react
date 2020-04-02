import React, { Component } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '', passwordcheck: '', email: '' };

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChangeInput(ev) {
        this.setState({ ...this.state, [ev.target.id]: ev.target.value })
    }
    handleSubmit(ev) {
        ev.preventDefault();
        if (this.state.username === '' || this.state.password === '') {
            alert("Anna käyttäjätunnus ja salasana");
        } else {
            axios.post('https://localhost:5001/northwind/logins/singin/', { username: this.state.username, password: this.state.password })
                .then(response => {
                    alert("Tervetuloa " + response.data.user.username + "!");
                    setUserSession(response.data.token, response.data.user);
                    this.props.history.push('/customers');
                    window.location.reload();
                }).catch(error => {
                    if (error.response) {
                        alert(error.response.data.message);
                    }
                });
        }
    }
    render() {
        const style = { margin: "6px", width: "240px", display: "flex", alignItems: "center" };

        return (
            <div className="container d-flex justify-content-center" style={{ marginTop: "30px" }}>
                <div className="jumbotron" style={{ maxWidth: "350px" }}>
                    <h3 className="mb-4">Kirjautuminen</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="">
                                <input style={style} onChange={this.handleChangeInput} type="text" className="form-control" id="username" placeholder="Käyttäjätunnus" />
                                <input style={style} onChange={this.handleChangeInput} type="password" className="form-control" id="password" placeholder="Salasana" />
                                <button type="submit" className="btn btn-outline-success" style={style}>Kirjaudu</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
