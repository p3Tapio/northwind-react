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
    // miksi eka klik ei toimi? Nyt näyttää siltä että singnaali liikkuu yhden klikin myöhässä  
    // KVG: react setstate synchronously ...
    // "Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state."
    // https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
    handleClickNext = (event) => {

        // var newStart = this.state.start;
        // if (newStart >= this.state.recordsCount - 10) {
        //     newStart = newStart - 1;
        // } else {
        //     newStart = newStart +10;
        // }
        // this.setState({
        //     start: newStart
        // })
        // var help = this.state.start;
        // alert(this.state.start + ", " + help);
        // this.GetCustomers();

        this.setState({
            start: this.state.start + 10
        })
        if (this.state.start >= this.state.recordsCount - 10) {
            this.setState({ start: this.state.recordsCount - 1 })
        }

        this.GetCustomers();
    }

    handleClickPrev = (event) => {

        var newStart = this.state.start;
        if (newStart > 0) {
            newStart = newStart - 10;
        }
        this.setState({ start: newStart })
        // alert(this.state.start + ", " + newStart);
        this.GetCustomers();
        // Tähän customerien hakuun parametrit joilla haetaan uusi setti? ******** 
    }
    componentDidMount() {
        this.GetCustomers();
    }
    GetCustomers() {
        axios.get('https://localhost:5001/northwind/customers/')
            .then(res => {
                const recordsCount = res.data.length;
                this.setState({ recordsCount });
            })
        axios.get('https://localhost:5001/northwind/customers/r?offset=' + this.state.start + '&limit=' + this.state.take)
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
