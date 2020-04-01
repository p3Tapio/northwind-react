import React, { Component } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '', passwordcheck: '', email: '', render: 'login' };

        this.handleClickVaihda = this.handleClickVaihda.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleClickVaihda(ev) {
        if (ev.target.id === 'tunnus') this.setState({ render: 'register' });
        else if (ev.target.id === 'kirjaudu') this.setState({ render: 'login' });
    }
    handleChangeInput(ev) {
        this.setState({ ...this.state, [ev.target.id]: ev.target.value })
    }
    handleSubmit(ev) {
        ev.preventDefault();
        if (this.state.render === 'login') {
            if (this.state.username === '' || this.state.password === '') {
                alert("Anna käyttäjätunnus ja salasana");
            } else {

                axios.post('/proj_api/users.php', { req: this.state.render, username: this.state.username, password: this.state.password })
                .then(response => {
                    // console.log(response.data.Token + " " + response.data.user.username);
                    alert("Tervetuloa "+response.data.user.username+"!"); 
                    setUserSession(response.data.token, response.data.user);
                    this.props.history.push('/omatsivut');
                    window.location.reload();  // onko kirjaudu -> kirjaudu ulos -tekstien muutokselle vaihtoehto? 
                }).catch(error => { 
                    if (error.response) {
                        alert(error.response.data.message);
                    }
                });

            }
        }
        else if (this.state.render === 'register') {

            if (this.state.password !== this.state.passwordcheck) {
                alert("Salasanat ei täsmää");
                ev.preventDefault();
            } else if (this.state.password === '' || this.state.username === '') {
                alert("Anna salasana ja käyttäjätunnus, jotta voit kirjautua.\nSpostilla nyt ei niin väliä.");
                ev.preventDefault();
            } else {
                axios.post('/proj_api/users.php', { req: this.state.render, username: this.state.username, password: this.state.password, email: this.state.email })
                    .then(response => {
                        alert("Tervetuloa!\n " + response.data.message + "!\n Voit nyt kirjautua sivulle.");
                        window.location.reload();
                    }).catch(error => {
                        if (error.response) {
                            alert(error.response.data.message);
                        }
                    });
            }
        }
    }
    render() {
        const style = { margin: "4px", width: "240px", display: "flex", alignItems: "center" };
        if (this.state.render === 'login') {
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
                                    <small style={{ color: "brown", cursor: "pointer", marginLeft: "8px" }} onClick={this.handleClickVaihda} id="tunnus">Luo käyttäjätunnus</small>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else if (this.state.render === 'register') {
            return (
                <div className="container d-flex justify-content-center" style={{ marginTop: "30px" }}>
                    <div className="jumbotron" style={{ maxWidth: "350px" }}>
                        <h3 className="mb-4">Luo käyttäjätunnus</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="">
                                    <input style={style} onChange={this.handleChangeInput} type="text" className="form-control" id="username" placeholder="Käyttäjätunnus" />
                                    <input style={style} onChange={this.handleChangeInput} type="password" className="form-control" id="password" placeholder="Salasana" />
                                    <input style={style} onChange={this.handleChangeInput} type="password" className="form-control" id="passwordcheck" placeholder="Salasana uudestaan" />
                                    <input style={style} onChange={this.handleChangeInput} type="text" className="form-control" id="Email" placeholder="Sähköposti" />
                                    <button type="submit" className="btn btn-outline-success" style={{ margin: "5px", width: "115px" }}>Tallenna</button>
                                    <button type="reset" className="btn btn-outline-warning" style={{ marginLeft: "5px", width: "115px" }}>Tyhjennä</button><br/>
                                    <small style={{ color: "brown", cursor: "pointer", marginLeft: "8px" }} onClick={this.handleClickVaihda} id="kirjaudu">Kirjaudu</small>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        else {
            return <p>Loading....</p>
        }
    }
}
