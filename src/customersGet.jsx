

import React from 'react';
import axios from 'axios';
import { CustomersCreate } from './customersCreate';
import { CustomersEdit } from './customersEdit';

export class CustomersGet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            customerForEdit: [],
            customerId: '',
            recordsCount: 0,
            start: 0,
            take: 10,
            country: '',
            countries: [],
            visible: 'mainTable',
            renderAdd: 'true',
            renderEdit: 'true'
        };

        this.handleClickMenuBtn = this.handleClickMenuBtn.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleUnmountAdd = this.handleUnmountAdd.bind(this);
        this.handleUnmountEdit = this.handleUnmountEdit.bind(this);
    }

    handleClickNext = () => {
        let newStart = this.state.start + 10;
        if (newStart > this.state.recordsCount) newStart = this.state.recordsCount - 1;
        this.setState({ start: newStart }, this.GetCustomers(newStart, this.state.country));

    }
    handleClickPrev = () => {
        let newStart = this.state.start - 10;
        if (newStart < 0) newStart = 0;
        this.setState({ start: newStart }, this.GetCustomers(newStart, this.state.country));
    }
    handleChangeCountry(event) {
        let selectedCountry = event.target.value;
        if (selectedCountry === 'Hae maan perusteella') selectedCountry = undefined;
        this.setState({ country: selectedCountry }, this.GetCustomers(this.state.start, selectedCountry));
    }
    handleUnmountAdd() {
        this.setState({ renderAdd: false, visible: 'mainTable' });
        this.GetCustomers();
    }
    handleUnmountEdit() {
        this.setState({ renderEdit: false, visible: 'mainTable' });
        this.GetCustomers();
    }

    handleClickEdit = (customer) => {
        this.setState({ customerForEdit: customer, visible: "EditCustomer", renderEdit: "true"});
    }
    handleClickMenuBtn(ev) {
        this.setState({ visible: ev.target.id });
    }
    GetCustomers(start, country) {

        if (start === undefined) start = this.state.start;
        if (country === undefined) {
            axios.get('https://localhost:5001/northwind/customers/')
                .then(res => {
                    const recordsCount = res.data.length;
                    this.setState({ recordsCount });
                })
            axios.get('https://localhost:5001/northwind/customers/r?offset=' + start + '&limit=' + this.state.take)
                .then(res => {
                    const customers = res.data;
                    this.setState({ customers });
                })
        } else {
            axios.get('https://localhost:5001/northwind/customers/country/' + country)
                .then(res => {
                    const customers = res.data;
                    const recordsCount = res.data.length;
                    this.setState({ recordsCount, customers });
                })
        }
    }
    componentDidMount() {
        axios.get('https://localhost:5001/northwind/customers/country').then(res => {
            const countries = res.data;
            this.setState({ countries });
        })
        this.GetCustomers();
    }
    render() {

        let countryList = this.state.countries.map((country, index) => <option key={index}>{country}</option>);

        if (this.state.visible === "mainTable") {

            return (
                <div style={{ margin: "25px" }}>
                    <h4 style={{ marginLeft: "15px" }}>Asiakkaat</h4>
                    <div className="form-group row " style={{ marginLeft: "1px" }}>
                        <select onChange={this.handleChangeCountry} value={this.state.country} className="form-control" style={{ width: "200px" }}>
                            <option key={0}>Hae maan perusteella</option>
                            {countryList}
                        </select>
                        <div style={{ marginTop: "5px" }}><button onClick={this.handleClickMenuBtn} type="button" className="btn btn-secondary-outline btn-sm" id="AddCustomer">Lisää asiakas</button>
                            <button type="button" className="btn btn-secondary-outline btn-sm" data-toggle="modal" data-target="#helpModal">Help</button></div>
                        <Modal show="mainTable" />
                    </div>
                    <table className="table table-hover">
                        <thead><tr className="table-default"><td>Yritys</td><td>Yhteyshenkilö</td><td>Osoite</td><td>Puhelinnumero</td><td></td></tr></thead>
                        <tbody>
                            {this.state.customers.map(item =>
                                <tr key={item.customerId}>
                                    <td>{item.companyName}</td>
                                    <td>{item.contactTitle} {item.contactName}</td>
                                    <td>{item.address}<br></br>{item.postalCode} {item.city}<br></br>{item.country}</td>
                                    <td>{item.phone}</td>
                                    <td><button onClick={this.handleClickEdit.bind(this, item)} className="btn btn-outline-secondary" style={{ margin: "10px" }}>Muokkaa</button>
                                        <button className="btn btn-outline-warning" style={{ margin: "10px" }}>Poista</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div style={{ textAlign: "center" }}>
                        <button onClick={this.handleClickPrev} className="btn btn-outline-secondary btn-lg" style={{ marginRight: "5px" }}>Edelliset</button>
                        <button onClick={this.handleClickNext} className="btn btn-outline-secondary btn-lg">Seuraavat</button>
                    </div>
                </div>
            )
        } else if (this.state.visible === "AddCustomer") {
            return (
                <div style={{ margin: "25px" }}>
                    <h4 style={{ marginLeft: "15px" }}>Asiakkaat</h4>
                    <div className="form-group row " style={{ marginLeft: "1px" }}>
                        <div style={{ marginTop: "5px" }}><button onClick={this.handleClickMenuBtn} type="button" className="btn btn-secondary-outline btn-sm" id="mainTable">Kaikki asiakkaat</button>
                            <button type="button" className="btn btn-secondary-outline btn-sm" data-toggle="modal" data-target="#helpModal">Help</button></div>
                        <Modal show="add" />
                    </div>
                    {this.state.renderAdd ? <CustomersCreate unmountMe={this.handleUnmountAdd} /> : null}
                </div>
            )
        } else if (this.state.visible === "EditCustomer") {
            return (
                <div style={{ margin: "25px" }}>
                    <h4 style={{ marginLeft: "15px" }}>Asiakkaat</h4>
                    <div className="form-group row " style={{ marginLeft: "1px" }}>
                        <div style={{ marginTop: "5px" }}><button onClick={this.handleClickMenuBtn} type="button" className="btn btn-secondary-outline btn-sm" id="mainTable">Kaikki asiakkaat</button>
                            <button type="button" className="btn btn-secondary-outline btn-sm" data-toggle="modal" data-target="#helpModal">Help</button></div>
                        <Modal show="edit" />
                    </div>
                    {this.state.renderAdd ? <CustomersEdit unmountMe={this.handleUnmountEdit} customer={this.state.customerForEdit} /> : null}
                </div>
            )
        } else {
            return <h4>Sivua ladataan</h4>;
        }
    }
}


function Modal(props) {

    let msg;
    if (props.show === "mainTable") {
        msg = "Asiakasnäkymässä voit tarkastella asiakastietoja maittain pudotusvalikon kautta. Asiakastietojen muokkaaminen ja poistaminen onnistuu klikkaamalla rivillä olevia nappeja.";
    } else if (props.show === "add") {
        msg = 'Voit lisätä asiakkaan täyttämällä kaavakkeen ja painamalla Tallenna asiakastiedot -nappulaa.Takaisin päänäkymään pääsee klikkaamalla Kaikki asiakkaat -kohtaa.';
    } else if (props.show === "edit") {
        msg = 'Tällä sivulla voit muokata asiakastietoja. Pääset takaisin päänäkymään painamalla "kaikki asiakkaat" -kohtaa.';
    } else if (props.show === "delete") {
        msg = 'Tällä sivulla tarkistetaan haluatko varmasti poistaa asiakkaan. Klikkaa palaa takaisin -nappia, jos haluat säilyttää asiakastiedot. Paina poista-nappia, jos haluat poistaa tiedot tietokannasta';
    } else {
        msg = "Helppi puuttuu";
    }

    return (
        <div className="modal fade" id="helpModal" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Help</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{msg}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Sulje</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
