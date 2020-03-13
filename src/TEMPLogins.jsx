import React from 'react';
import axios from 'axios';
import { LoginsCreate } from './TEMPLoginsCreate';

export class LoginsGet extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logins: [], recordsCount: 0, visible: "mainTable" };
        this.handleClickMenuBtn = this.handleClickMenuBtn.bind(this);
    }

    componentDidMount() {
        this.GetLogins("");
    }
    handleChangeInput = (ev) => {
        if (ev.target.value.length > 0) this.GetLogins(ev.target.value);
        else this.GetLogins("");
    }
    handleClickEdit() {

    }
    handleClickMenuBtn(ev) {
        this.setState({ visible: ev.target.id });
    }
    GetLogins(sukunimi) {

        let url = "";
        if (sukunimi === "") url = 'https://localhost:5001/northwind/logins';
        else url = 'https://localhost:5001/northwind/logins/' + sukunimi;

        axios.get(url)
            .then(res => {
                const recordsCount = res.data.length;
                const logins = res.data;
                console.log(logins);
                this.setState({ logins, recordsCount })
            })
    }
    render() {
        if (this.state.visible === "mainTable") {
            return (
                <div style={{ margin: "25px" }}>
                    <h4 style={{ marginLeft: "15px" }}>Käyttäjät</h4>
                    <div className="form-group row " style={{ marginLeft: "1px" }}>
                        <input onChange={this.handleChangeInput} type="text" className="form-control" id="nimi" placeholder="Hae sukunimellä" style={{ width: "200px" }} />
                        <div style={{ marginTop: "5px" }}><button onClick={this.handleClickMenuBtn} type="button" className="btn btn-secondary-outline btn-sm" id="AddLogin">Lisää käyttäjä</button></div>
                        <button type="button" className="btn btn-secondary-outline btn-sm" data-toggle="modal" data-target="#helpModal">Help</button>
                        <Modal show="mainTable" />
                    </div>
                    <table className="table table-hover" style={{ width: "calc (400px + 50vmin)" }}>
                        <thead><tr className="table-default"><td>Nimi</td><td>Sähköposti</td><td>Käyttäjätunnus</td><td>Käyttöoikeudet</td><td></td></tr></thead>
                        <tbody>
                            {this.state.logins.map(item =>
                                <tr key={item.loginId}>
                                    <td>{item.firstname} {item.lastname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.accesslevelId}</td>
                                    <td>
                                        <button onClick={this.handleClickEdit.bind(this, item)} className="btn btn-outline-secondary" style={{ margin: "10px" }}>Muokkaa</button>
                                        <button onClick={() => this.setState({ customerForEdit: item })} className="btn btn-outline-warning" style={{ margin: "10px" }} data-toggle="modal" data-target="#DeleteModal">Poista</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

            )
        } else if (this.state.visible === "AddLogin") {
            return (
                <div style={{ margin: "25px" }}>
                    <h4 style={{ marginLeft: "15px" }}>Käyttäjät</h4>
                    <div className="form-group row " style={{ marginLeft: "1px" }}>
                        <input onChange={this.handleChangeInput} type="text" className="form-control" id="nimi" placeholder="Hae sukunimellä" style={{ width: "200px" }} />
                        <div style={{ marginTop: "5px" }}><button onClick={this.handleClickMenuBtn} type="button" className="btn btn-secondary-outline btn-sm" id="AddCustomer">Lisää käyttäjä</button></div>
                        <button type="button" className="btn btn-secondary-outline btn-sm" data-toggle="modal" data-target="#helpModal">Help</button>
                        <Modal show="AddLogin" />
                    </div>
                    <LoginsCreate />
                </div>
            )
        } else {
            return <h4>ERROR</h4>;
        }
    }


}
function Modal(props) {
    let msg = "";
    if (props.show === "mainTable") {
        msg = <p>Voit hakea käyttäjätiedot sukunimellä hakukentän avulla. Tietoja voi muokata tai poistaa klikkaamalla käyttäjätietorivillä olevia nappeja. Lisää käyttäjä -nappia painamalla voi lisätä uuden käyttäjän</p>;
    } else if (props.show==="AddLogin") {
        msg = <p>Lisää uusi käyttäjä täyttämällä kentät ja painamalla tallenna-nappia.</p>
    }
    return (
        <div class="modal fade" id="helpModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Help</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {msg}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Sulje</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
