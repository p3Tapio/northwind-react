import React from 'react';
import axios from 'axios';

export class CustomersFetch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            recordsCount: 0,
            start: 0,
            take: 10
        };
    }

    handleClickNext = () => {
        let newStart = this.state.start +10;  
        if(newStart > this.state.recordsCount) newStart = this.state.recordsCount-1;
        this.GetCustomers(newStart);
        this.setState({start : newStart})
    }

    handleClickPrev = () => {
        let newStart = this.state.start -10; 
        if(newStart < 0) newStart = 0; 
        this.GetCustomers(newStart);
        this.setState({start : newStart})
    }
    componentDidMount() {
        this.GetCustomers();
    }
    GetCustomers(start) {

        if (start === undefined) start = this.state.start;

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
    }
    render() {
        return (
            <div style={{ margin: "15px" }}>
                <h4>Asiakkaat</h4>
                <table className="table table-hover" style={{ width: "calc (400px + 50vmin)" }}>
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
