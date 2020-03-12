import React, { Component } from 'react';
import axios from 'axios';

export class CustomersEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerid: this.props.customer.customerId, company: this.props.customer.companyName, contactName: this.props.customer.contactName, contactTitle: this.props.contactTitle,
            address: this.props.customer.address, city: this.props.customer.city, region: this.props.customer.region, postalCode: this.props.customer.postalCode, country: this.props.customer.country, countries: [], phone: this.props.customer.phone
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get('https://localhost:5001/northwind/customers/country').then(res => {
            const countries = res.data;
            this.setState({ countries });
        })
    }
    handleChangeInput(ev) {
        var input = ev.target.value;
        if (ev.target.id === "customerid") input = input.toUpperCase();
        this.setState({ ...this.state, [ev.target.id]: input });
    }
    handleSubmit(ev) {

        ev.preventDefault();
        this.insertoiKantaan();

    }
    dismiss() {
        this.props.unmountMe();
    }
    insertoiKantaan() {
        const customer = {
            customerId: this.state.customerid, companyName: this.state.company, contactName: this.state.contactName,
            contactTitle: this.state.contactTitle, address: this.state.address, city: this.state.city,
            region: this.state.region, postalCode: this.state.postalCode,
            country: this.state.country, phone: this.state.phone
        }
        const customerJson = JSON.stringify(customer);
        const url = 'https://localhost:5001/northwind/customers/' + this.state.customerid;
        fetch(url, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: customerJson
        }).then((res) => res.json())
            .then((json) => {
                const success = json;
                if (success) {
                    alert("Pyyntö asiakkaan tietojen muokkamiseksi lähetetty");
                    this.dismiss();
                }
            });
    }
    render() {
        console.log(this.props.customer);
        let countryList = this.state.countries.map((country, index) => <option key={index}>{country}</option>);
        return (
            <div class="container" style={{ marginLeft: "0px" }}>
                <h5>Muokkaa asiakkaan "{this.props.customer.companyName}" asiakastietoja</h5><hr />
                <form onSubmit={this.handleSubmit}>
                        <div class="row">
                            <div className="col-sm-12 ">
                                <label style={{ margin: "0px 0px 0px 8px" }}>Asiakastunnus</label>
                                <input type="text" onChange={this.handleChangeInput} className="form-control" id="customerid" defaultValue={this.props.customer.customerId} />
                                <label style={{ margin: "0px 0px 0px 8px" }}>Yrityksen nimi</label>
                                <input type="text" onChange={this.handleChangeInput} className="form-control" id="company" defaultValue={this.props.customer.companyName} />
                                <label style={{ margin: "0px 0px 0px 8px" }}>Yrityksen edustaja</label>
                                <input type="text" onChange={this.handleChangeInput} className="form-control" id="contactName" defaultValue={this.props.customer.contactName} />
                                <label style={{ margin: "0px 0px 0px 8px" }}>Titteli</label>
                                <input type="text" onChange={this.handleChangeInput} className="form-control" id="contactTitle" defaultValue={this.props.customer.contactTitle} />
                                <label style={{ margin: "0px 0px 0px 8px" }}>Osoite</label>
                                <input type="text" onChange={this.handleChangeInput} className="form-control" id="address" defaultValue={this.props.customer.address} />
                                <label style={{ margin: "0px 0px 0px 8px" }}>Postinumero</label>
                                <input type="text" onChange={this.handleChangeInput} className="form-control" id="postalCode" defaultValue={this.props.customer.postalCode} />
                                <label style={{ margin: "0px 0px 0px 8px" }}>Kaupunki</label>
                                <input type="text" onChange={this.handleChangeInput} className="form-control" id="city" defaultValue={this.props.customer.city} />
                                <label style={{ margin: "0px 0px 0px 8px" }}>Seutu</label>
                                <input type="text" onChange={this.handleChangeInput} className="form-control" id="region" defaultValue={this.props.customer.region} />
                                <label style={{ margin: "0px 0px 0px 8px" }}>Maa</label>
                                <select onChange={this.handleChangeInput} defaultValue={this.state.country} className="form-control" style={{ width: "200px" }} id="country">
                                    <option key={0} value={this.props.customer.country}>{this.props.customer.country}</option>
                                    {countryList}
                                </select>
                                <label style={{ margin: "0px 0px 0px 8px" }}>Puhelinnumero</label>
                                <input type="text" onChange={this.handleChangeInput} className="form-control flex-item-9" id="phone" defaultValue={this.props.customer.phone} style={{ marginBottom: "30px" }} />
                                <div className="row">
                                    <button type="submit" className="btn btn-outline-success" style={{ marginLeft: "20px", width: "200px" }}>Tallenna</button>
                                </div>
                            </div>
                        </div>
                </form>
            </div>
        );
    }
}