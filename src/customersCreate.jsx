import React, { Component } from 'react';
import axios from 'axios';

export class CustomersCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerid: '', company: '', contactName: '', contactTitle: '',
            address: '', city: '', region: '', postalCode: '', country: '', countries: [], phone: ''
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get('https://northwindrestapi.azurewebsites.net/northwind/customers/country').then(res => {
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
        if (this.state.customerid === "" || this.state.company === "" || this.state.phone === "" || this.state.country === "") {
            alert("Täytä edes asiakastunnus, yrityksen nimi, maa ja puhelinnumero ennen tallentamista.");
            ev.preventDefault();
        } else {
            ev.preventDefault();
            this.insertoiKantaan();
        }
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

        fetch('https://northwindrestapi.azurewebsites.net/northwind/customers', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: customerJson
        }).then((res) => res.json())
            .then((json) => {
                const success = json;
                if (success) {
                    alert("Pyyntö asiakkaan lisäämiseksi lähetetty");
                    this.dismiss();
                }
            });
    }
    render() {
        const countryList = this.state.countries.map((country, index) => <option key={index}>{country}</option>);
        return (
            <form onSubmit={this.handleSubmit}>
                <h4 style={{ marginLeft: "20px" }}>Lisää asiakas</h4>
                <div className="form-group">
                    <div class="col-sm-10">
                        <input type="text" title="Syötä asiakastunnus" onChange={this.handleChangeInput} className="form-control" id="customerid" placeholder="Customer ID" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="company" placeholder="Company" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="contactName" placeholder="Contact Name" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="contactTitle" placeholder="Contact Title" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="address" placeholder="Address" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="city" placeholder="City" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="region" placeholder="Region" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="postalCode" placeholder="Postal Code" />
                        <select onChange={this.handleChangeInput} value={this.state.country} className="form-control" style={{ width: "200px" }} id="country">
                            <option key={0}>Country</option>
                            {countryList}
                        </select>
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="phone" placeholder="Phone" />
                        <button type="submit" className="btn btn-outline-success" style={{ margin: "5px", width: "200px" }}>Tallenna asiakastiedot</button><br />
                        <button type="reset" className="btn btn-outline-warning" style={{ marginLeft: "5px", width: "200px" }}>Tyhjennä kentät</button>
                    </div>
                </div>
            </form>
        );
    }
}
