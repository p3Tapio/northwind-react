import React from 'react';
import axios from 'axios';
import { LoginsCreate } from './LoginsCreate';
import { LoginsEdit } from './LoginsEdit.jsx';

export class LoginsGet extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logins: [], recordsCount: 0, visible: "mainTable", userForEdit: [] };
        this.handleClickMenuBtn = this.handleClickMenuBtn.bind(this);
        this.handleUnmount = this.handleUnmount.bind(this);
        this.performDelete = this.performDelete.bind(this);
    }

    componentDidMount() {
        this.getLogins("");
    }
    handleChangeInput = (ev) => {
        if (ev.target.value.length > 0) this.getLogins(ev.target.value);
        else this.getLogins("");
    }
    handleUnmount() {
        this.setState({ visible: "mainTable" }, this.getLogins(""))
    }
    handleClickMenuBtn(ev) {
        this.setState({ visible: ev.target.id });
    }
    getLogins(sukunimi) {

        let url = "";
        if (sukunimi === "") url = 'https://localhost:5001/northwind/logins';
        else url = 'https://localhost:5001/northwind/logins/' + sukunimi;

        axios.get(url)
            .then(res => {
                const recordsCount = res.data.length;
                const logins = res.data;
                this.setState({ logins, recordsCount })
            })
    }
    performDelete(id) {
        const url = 'https://localhost:5001/northwind/logins/delete/' + id;
        axios.delete(url).then(res => {
            this.getLogins("");
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        if (this.state.visible === "mainTable") {
            return (
                <div style={{ margin: "25px" }}>
                    <h4 style={{ marginLeft: "15px" }}>Käyttäjät</h4>
                    <div className="form-group row " style={{ marginLeft: "1px" }}>
                        <input onChange={this.handleChangeInput} type="text" className="form-control" id="nimi" placeholder="Hae sukunimellä" style={{ width: "200px" }} />
                        <div style={{ marginTop: "5px" }}><button onClick={this.handleClickMenuBtn} type="button" className="btn btn-outline-secondary btn-sm" id="AddLogin">Lisää käyttäjä</button>
                            <button type="button" className="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#helpModal">Help</button></div>
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
                                        <button onClick={() => this.setState({ userForEdit: item, visible: "edit" })} className="btn btn-outline-secondary" style={{ margin: "10px" }}>Muokkaa</button>
                                        <button onClick={() => this.setState({ userForEdit: item })} className="btn btn-outline-warning" style={{ margin: "10px" }} data-toggle="modal" data-target="#DeleteModal">Poista</button>
                                        <DeleteModal user={this.state.userForEdit} deleteFunction={this.performDelete} />
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
                    <h4 style={{ marginLeft: "15px" }}>Lisää käyttäjä</h4>
                    <div className="form-group row " style={{ marginLeft: "1px" }}>
                        <div style={{ marginTop: "5px" }}><button onClick={this.handleClickMenuBtn} type="button" className="btn btn-outline-secondary btn-sm" id="mainTable">Kaikki käyttäjät</button>
                            <button type="button" className="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#helpModal">Help</button></div>
                        <Modal show="AddLogin" />
                    </div>
                    <LoginsCreate unmountMe={this.handleUnmount} />
                </div>
            )
        } else if (this.state.visible === "edit") {
            return (
                <div style={{ margin: "25px" }}>
                    <h4 style={{ marginLeft: "15px" }}>Muokkaa käyttäjätietoja</h4>
                    <div className="form-group row " style={{ marginLeft: "1px" }}>
                        <div style={{ marginTop: "5px" }}><button onClick={this.handleClickMenuBtn} type="button" className="btn btn-outline-secondary btn-sm" id="mainTable">Kaikki käyttäjät</button>
                            <button type="button" className="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#helpModal">Help</button></div>
                        <Modal show="edit" />
                    </div>
                    <LoginsEdit unmountMe={this.handleUnmount} user={this.state.userForEdit} />
                </div>
            )

        }
        else {
            return <h4>Loading, loading .... </h4>;
        }
    }


}
class DeleteModal extends React.Component {

    handleClickDelete() {
        this.props.deleteFunction(this.props.user.loginId);
    }
    render() {
        return (
            <div className="modal fade" id="DeleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Haluatko varmasti poistaa käyttäjän <br />{this.props.user.firstname} {this.props.user.lastname}?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.handleClickDelete.bind(this)} type="button" className="btn btn-outline-warning" data-dismiss="modal">Poista</button>
                            <button type="button" className="btn btn-outline-success" data-dismiss="modal">Peruuta</button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

function Modal(props) {
    let msg = "";
    if (props.show === "mainTable") {
        msg = <p>Voit hakea käyttäjätiedot sukunimellä hakukentän avulla. Tietoja voi muokata tai poistaa klikkaamalla käyttäjätietorivillä olevia nappeja. Lisää käyttäjä -nappia painamalla voi lisätä uuden käyttäjän</p>;
    } else if (props.show === "AddLogin") {
        msg = <p>Lisää uusi käyttäjä täyttämällä kentät ja painamalla tallenna-nappia.</p>
    } else if (props.show === "edit") {
        msg = <p>Voit muokata käyttäjän tietoja vaihtamalla kentissä olevia tietoja.</p>
    }
    return (
        <div className="modal fade" id="helpModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Help</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {msg}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Sulje</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
