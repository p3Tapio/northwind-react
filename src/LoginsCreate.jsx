import React from 'react';
import axios from 'axios';

export class LoginsCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginId: '', firstname: '', lastname: '',
            email: '', username: '', password: '', accesslevelId: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }
    handleChangeInput(ev) {
        this.setState({ ...this.state, [ev.target.id]: ev.target.value });
    }
    handleSubmit(ev) {
        if (this.state.username === "" || this.state.email === "" || this.state.password === "") {
            alert("Anna edes käyttäjätunnus, salasana ja sähköposti ennen tallentamista.");
            ev.preventDefault();
        } else {
            ev.preventDefault();
            
            // Password hash: 
            let url = "http://md5.jsontest.com/?text=" + this.state.password;
            axios({
                method: 'get',
                url: url,
                config: { headers: { 'Content-Type': 'application/json' } }
            }).then(res => {
                const password = res.data;
                this.setState({ password: password.md5 })
            });
            this.saveUser();
        }
    }
    saveUser() {

        const newUser = {
            Firstname: this.state.firstname, Lastname: this.state.lastname,
            Email: this.state.email, Username: this.state.username, Password: 'password', AccesslevelId: this.state.accesslevelId
        }
        const userJson = JSON.stringify(newUser);

        fetch('https://localhost:5001/northwind/logins', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: userJson
        }).then((res) => res.json())
            .then((json) => {
                const success = json;
                if (success) {
                    alert("Pyyntö asiakkaan lisäämiseksi lähetetty");
                    // this.dismiss();
                }
            });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h4 style={{ marginLeft: "20px" }}>Lisää asiakas</h4>
                <div className="form-group">
                    <div className="col-sm-10">
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="firstname" placeholder="Etunimi" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="lastname" placeholder="Sukunimi" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="email" placeholder="Sähköposti" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="username" placeholder="Käyttäjätunnus" />
                        <input type="password" onChange={this.handleChangeInput} className="form-control" id="password" placeholder="Salasana" />
                        <select onChange={this.handleChangeInput} value={this.state.accesslevelId} className="form-control" style={{ width: "200px" }} id="accesslevelId">
                            <option key={0}>Käyttöoikeudet</option>
                            <option key={1}>1</option>
                            <option key={2}>2</option>
                            <option key={3}>3</option>
                            <option key={4}>4</option>
                            <option key={5}>5</option>
                        </select>
                        <button type="submit" className="btn btn-outline-success" style={{ margin: "5px", width: "200px" }}>Tallenna asiakastiedot</button><br />
                        <button type="reset" className="btn btn-outline-warning" style={{ marginLeft: "5px", width: "200px" }}>Tyhjennä kentät</button>
                    </div>
                </div>
            </form>
        );
    }
}

//* SALASANA HASH: 