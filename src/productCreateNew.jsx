import React, { Component } from 'react';
import axios from 'axios';

export default class ProductCreateNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suppliers: [], categories: [], productName: '',
            categoryId: undefined, supplierId: undefined, quantityPerUnit: '', unitPrice: '',
            unitsInStock: '', unitsOnOrder: '', reorderLevel: '', discontinued: true
        }

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get('https://northwindrestapi.azurewebsites.net/northwind/products/categories').then(res => {
            const categories = res.data;
            this.setState({ categories });
        })
        axios.get('https://northwindrestapi.azurewebsites.net/northwind/products/suppliers').then(res => {
            const suppliers = res.data;
            this.setState({ suppliers });
        })
    }
    handleChangeInput(ev) {
        if (ev.target.id === 'discontinued') {
            var newState;
            newState = this.state.discontinued === true ? false : true;
            this.setState({ discontinued: newState });
        } else if (ev.target.id === 'supplier') {
            this.setState({ supplierId: ev.target.options.selectedIndex });
        } else if (ev.target.id === 'category') {
            this.setState({ categoryId: ev.target.options.selectedIndex });
        } else {
            this.setState({ ...this.state, [ev.target.id]: ev.target.value });
        }
    }
    handleSubmit(ev) {
        if(this.state.productName==="" || this.state.categoryId==="" || this.state.supplierId==="" || this.state.quantityPerUnit ==="" || this.state.unitPrice ===""
        || this.state.unitsInStock==="" || this.state.unitsOnOrder==="" || this.state.reorderLevel==="") {
            alert("Täytä tuotetiedot ennen tallentamista!"); 
            ev.preventDefault();
        } else {
            ev.preventDefault();
            this.insertoiKantaan(); 
        }

       
    }
    insertoiKantaan() {
        const prodJson = JSON.stringify({
            productName: this.state.productName,
            categoryId: this.state.categoryId,
            supplierId: this.state.supplierId,
            quantityPerUnit: this.state.quantityPerUnit, 
            unitPrice: this.state.unitPrice,
            unitsInStock: this.state.unitsInStock, 
            unitsOnOrder: this.state.unitsOnOrder,
            reorderLevel: this.state.reorderLevel,
            discontinued: this.state.discontinued
        })

        fetch('https://northwindrestapi.azurewebsites.net/northwind/products/create', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: prodJson
        }).then((res) => res.json())
            .then((json) => {
                const success = json;
                if (success) {
                    alert("Pyyntö tuotteen lisäämiseksi lähetetty");
                    this.props.unmountMe(); 
                }
            }).catch(err => {
                console.log(err);
            });

    }
    render() {
        const categoryList = this.state.categories.map(category => <option key={category.categoryId} data-key={category.categoryId}>{category.categoryName}</option>);
        const supplierList = this.state.suppliers.map(supplier => <option key={supplier.supplierId} data-key={supplier.supplierId}>{supplier.companyName}</option>);
        return (
            <form onSubmit={this.handleSubmit}>
                <h4 style={{ marginLeft: "20px" }}>Lisää tuote</h4>
                <div className="form-group">
                    <div className="col-sm-10">
                        <input type="text" title="Syötä tuotteen nimi" onChange={this.handleChangeInput} className="form-control" id="productName" placeholder="Tuotteen nimi" />
                        <select onChange={this.handleChangeInput} className="form-control" style={{ width: "200px" }} id="supplier">
                            <option key={0}>Tuottaja</option>
                            {supplierList}
                        </select>
                        <select onChange={this.handleChangeInput} className="form-control" style={{ width: "200px" }} id="category">
                            <option key={0}>Kategoria</option>
                            {categoryList}
                        </select>
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="quantityPerUnit" placeholder="Kappalemäärä" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="unitPrice" placeholder="Hinta" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="unitsInStock" placeholder="Varastossa" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="unitsOnOrder" placeholder="Tilaukset" />
                        <input type="text" onChange={this.handleChangeInput} className="form-control" id="reorderLevel" placeholder="Uudelleen tilaukset" />
                        <label className="form-check-label" style={{ marginLeft: '-12px', marginRight: "35px" }}>Saatavilla</label> <input id="discontinued" onChange={this.handleChangeInput} className="form-check-input" type="checkbox" /><hr />
                        <button type="submit" className="btn btn-outline-success" style={{ margin: "5px", width: "200px" }}>Tallenna tuotetiedot</button><br />
                        <button type="reset" className="btn btn-outline-warning" style={{ marginLeft: "5px", width: "200px" }}>Tyhjennä kentät</button>
                    </div>
                </div>
            </form>
        );


    }
}
