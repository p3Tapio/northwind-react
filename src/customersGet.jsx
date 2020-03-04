// TODO: sisältötekstit modaliin 
// TODO: Country:ssä Restin puolelle rajoitukset hakutuloksii samoin kuten koko setissä - onko tarpeen? 
// TODO: Sukunimihaku (rajoituksineen?)

import React from 'react';
import axios from 'axios';

export class CustomersGet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            recordsCount: 0,
            start: 0,
            take: 10,
            country: '',
            countries: []
        };
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
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
        if (selectedCountry === 'Hae kaikki') selectedCountry = undefined;
        this.setState({ country: selectedCountry }, this.GetCustomers(this.state.start, selectedCountry));

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

        return (
            <div style={{ margin: "15px" }}>
               <h4 style={{marginLeft:"10px"}}>Asiakkaat</h4>
                <div className="form-group row " style={{marginLeft:"1px"}}>
                    <select onChange={this.handleChangeCountry} value={this.state.country} className="form-control" style={{ width: "200px" }}>
                        <option key={0}>Hae maan perusteella</option>
                        {countryList}
                    </select>
                    <input type ="text" className="form-control" placeholder="hae sukunimellä"/>
                    <button type="button" className="btn btn-secondary btn-sm" data-toggle="modal" data-target="#helpModal">Help</button>
                    <Modal/>
                </div>
                <table className="table table-hover">
                    <thead><tr className="table-default"><td>Yritys</td><td>Yhteyshenkilö</td><td>Osoite</td><td>Puhelinnumero</td></tr></thead>
                    <tbody>
                        {this.state.customers.map(item =>
                            <tr key={item.customerId}>
                                <td>{item.companyName}</td>
                                <td>{item.contactTitle} {item.contactName}</td>
                                <td>{item.address}, <br></br>{item.postalCode} {item.city}, <br></br>{item.country}</td>
                                <td>{item.phone}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{ textAlign: "center" }}>
                    <button onClick={this.handleClickPrev} className="btn btn-outline-secondary" style={{ marginRight: "5px" }}>Edelliset</button>
                    <button onClick={this.handleClickNext} className="btn btn-outline-secondary">Seuraavat</button>
                </div>
            </div>
        )
    }
}

function Modal() { 

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
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Sulje</button>
            </div>
          </div>
        </div>
        </div>
    );
}
