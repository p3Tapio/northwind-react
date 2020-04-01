import React, { Component } from 'react'

export class LoginsEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '', lastname: '',
            email: '', username: '', accesslevelId: ''
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }
    handleChangeInput(ev) {
        this.setState({ ...this.state, [ev.target.id]: ev.target.value });
    }
    handleClickTallenna(ev) {
        ev.preventDefault();
        let firstname = this.state.firstname; let lastname = this.state.lastname;
        let email = this.state.email; let username = this.state.username; let accesslevelId = this.state.accesslevelId;

        if (firstname === '') firstname = this.props.user.firstname;
        if (lastname === '') lastname = this.props.user.lastname;
        if (email === '') email = this.props.user.email;
        if (username === '') username = this.props.user.username;
        if (accesslevelId === '') accesslevelId = this.props.user.accesslevelId;

        const editJson = JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            accesslevelId: accesslevelId
        })
        this.saveEdit(editJson);

    }
    saveEdit(eJson) {

        fetch('https://localhost:5001/northwind/logins/' + this.props.user.loginId, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: eJson
        }).then((res) => res.json())
            .then((json) => {
                const success = json;
                if (success) {
                    alert("Käyttäjätiedot muokattu")
                    this.props.unmountMe();
                }
            }).catch(err => {
                console.log(err);
            });

    }
    render() {
        const labelStyle = { margin: "0px 0px 0px 8px" };
        return (
            <div>
                <form>
                    <div className="modal-body">
                        <label style={labelStyle}>Etunimi</label>
                        <input type="text" onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="firstname" defaultValue={this.props.user.firstname} />
                        <label style={labelStyle}>Sukunimi</label>
                        <input type="text" onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="lastname" defaultValue={this.props.user.lastname} />
                        <label style={labelStyle}>Sähköposti</label>
                        <input type="text" onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="email" defaultValue={this.props.user.email} />
                        <label style={labelStyle}>Käyttäjätunnus</label>
                        <input type="text" onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="username" defaultValue={this.props.user.username} />
                        <label style={labelStyle}>Käyttöoikeustaso</label>
                        <select onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="accesslevelId">
                            <option key={0}>{this.props.user.accesslevelId}</option>
                            <option key={1}>1</option>
                            <option key={2}>2</option>
                            <option key={3}>3</option>
                            <option key={4}>4</option>
                            <option key={5}>5</option>
                        </select>
                        <br />
                        <button onClick={this.handleClickTallenna.bind(this)} className="btn btn-outline-success" style={{ marginLeft: "4px", width: "280px" }}>Tallenna</button>
                    </div>
                </form>
            </div>
        )
    }
}
