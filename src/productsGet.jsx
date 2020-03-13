// huom pudotusvalikkoja, jottei fk:t kosahda jne 


import React from 'react';
import axios from 'axios';

export class productsGet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            recordsCount: 0,
            start: 0,
            take: 10
        }
    }
    componentDidMount() {
        this.getProducts();
    }
    getProducts(start) {
        axios.get('https://localhost:5001/northwind/products/').then(res => {
            const recordsCount = res.data.lenght;
            const products = res.data;
            this.setState({ products: products, recordsCount: recordsCount });
        })

    }
    render() {
        return (
            <div style={{ margin: "25px" }}>
                <h4 style={{ marginLeft: "15px" }}>Tuotteet</h4>
                <div className="form-group row " style={{ marginLeft: "1px" }}>


                    <div style={{ marginTop: "5px" }}><button onClick={this.handleClickMenuBtn} type="button" className="btn btn-secondary-outline btn-sm" id="AddCustomer">Lisää asiakas</button>
                        <button type="button" className="btn btn-secondary-outline btn-sm" data-toggle="modal" data-target="#helpModal">Help</button></div>

                </div>
                <table className="table table-hover">
                    <thead><tr className="table-default"><td>Tuotetunnus</td><td>Nimi</td><td>Tuotekategoria</td></tr></thead>
                    <tbody>
                        {this.state.products.map(item =>
                            <tr key={item.productId}>
                                <td>{item.productId}</td>
                                <td>{item.productName}</td>
                                <td>{item.categoryId}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

}
