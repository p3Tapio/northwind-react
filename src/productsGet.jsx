// huom pudotusvalikkoja, jottei fk:t kosahda jne 


import React from 'react';
import axios from 'axios';
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ProductCreateNew from './productCreateNew.jsx'

export class productsGet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: 'create',
            products: [],
            recordsCount: 0,
            category: undefined,
            categoryId: undefined,
            categories: [],
            start: 0,
            take: 10
        }
        this.handleChangeCat = this.handleChangeCat.bind(this);
    }
    componentDidMount() {
        axios.get('https://localhost:5001/northwind/products/categories').then(res => {
            const categories = res.data;
            this.setState({ categories });
        })
        this.getProducts(this.state.start, this.state.categoryId);
    }
    handleClickBrowse = (ev) => {

        console.log("state of records again: " + this.state.recordsCount)
        if (ev.target.id === "prev") {

            let newStart = this.state.start - 10;
            if (newStart < 0) newStart = 0;
            this.setState({ start: newStart }, this.getProducts(newStart, this.state.categoryId));

        } else if (ev.target.id === "next") {

            let newStart = this.state.start + 10;
            if (newStart > this.state.recordsCount) newStart = this.state.recordsCount - 5;
            this.setState({ start: newStart }, this.getProducts(newStart, this.state.categoryId));
        }
    }
    getProducts(start, categoryId) {

        if (start === undefined) start = this.state.start;
        console.log("categoryId: " + this.state.categoryId)
        if (categoryId === undefined) {
            axios.get('https://localhost:5001/northwind/products/')
                .then(res => {
                    const recordsCount = res.data.length;
                    this.setState({ recordsCount });
                })
            axios.get('https://localhost:5001/northwind/products/r?offset=' + start + '&limit=' + this.state.take)
                .then(res => {
                    const products = res.data;
                    this.setState({ products });
                })
        } else {
            axios.get('https://localhost:5001/northwind/products/category/' + categoryId)
                .then(res => {
                    const products = res.data;
                    const recordsCount = res.data.length;
                    this.setState({ recordsCount, products });
                    console.log("records: " + recordsCount + "\n state of records: " + this.state.recordsCount)
                })
        }
    }
    handleChangeCat(ev) {
        let selectedCat = ev.target.options.selectedIndex;
        if (ev.target.value === "Hae kategorian perusteella") selectedCat = undefined; this.setState({ start: 0 });
        this.setState({ categoryId: selectedCat }, this.getProducts(this.state.start, selectedCat));
    }
    render() {

        const categoryList = this.state.categories.map(category => <option key={category.categoryId} data-key={category.categoryId}>{category.categoryName}</option>);
        if (this.state.render === 'main') {
            return (
                <div style={{ margin: "25px" }}>
                    <h4 style={{ marginLeft: "15px" }}>Tuotteet</h4>
                    <div className="form-group row " style={{ marginLeft: "1px" }}>
                        <select onChange={this.handleChangeCat} className="form-control" style={{ width: "250px" }}>
                            <option key={0}>Hae kategorian perusteella</option>
                            {categoryList}
                        </select>
                        <div style={{ marginTop: "5px" }}><button onClick={this.handleClickMenuBtn} type="button" className="btn btn-outline-secondary btn-sm" id="AddCustomer">Lisää tuote</button>
                            <HelpPop show="main"/>
                        </div>
                    </div>
                    <table className="table table-hover">
                        <thead><tr className="table-default"><td>Tuotetunnus</td><td>Nimi</td><td>Tuotekategoria</td><td>Kappalehinta</td><td>Varasto</td></tr></thead>
                        <tbody>
                            {this.state.products.map(item =>
                                <tr key={item.productId}>
                                    <td>{item.productId}</td><td>{item.productName}</td><td>{item.categoryName}</td><td>{item.unitPrice.toFixed(2)}</td><td>{item.unitsInStock}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div style={{ textAlign: "center" }}>
                        <button id="prev" onClick={this.handleClickBrowse} className="btn btn-outline-secondary btn-lg" style={{ marginRight: "5px" }}>Edelliset</button>
                        <button id="next" onClick={this.handleClickBrowse} className="btn btn-outline-secondary btn-lg">Seuraavat</button>
                    </div>
                </div>
            );
        } else if (this.state.render === 'create') {
            return (
                <div style={{ margin: "25px" }}>
                    <h4 style={{ marginLeft: "15px" }}>Tuotteet</h4>
                    <div className="form-group row " style={{ marginLeft: "1px" }}>
                        <div style={{ marginTop: "5px" }}><button onClick={this.handleClickMenuBtn} type="button" className="btn btn-outline-secondary btn-sm" id="AddCustomer">Tuotteet</button>
                            <HelpPop show='create'/>
                        </div>
                        <ProductCreateNew />
                    </div>
                </div>
            )
        } else {
            return <p>Loading. ... .. </p>
        }

    }
}
function HelpPop(props) {

    if(props.show === 'main') {
        var content = "Alla näet tietokannassa olevat tuotteet. Voit lisätä uuden painamalla viereistä lisää tuote -nappia. Alla olevien tuotteiden tietoja voi muokata painamalla muokkaa-näppäintä ja tuotteen voi poistaa poista-nappia painamalla.";
    } else if (props.show ==='create') {
        var content = "Voit lisätä uuden tuotteen täyttämällä kentät ja painamalla tallenna näppäintä. Takaisin päänäkymään pääsee viereisestä tuotteet-näppäimestä.";
    }

    return (
        <>
            <OverlayTrigger
                trigger="click"
                key={'right'}
                placement={'right'}
                overlay={
                    <Popover id={`popover-positioned-${'right'}`}>
                        <Popover.Content>
                          {content}
                        </Popover.Content>
                    </Popover>
                }
            >
                <button variant="secondary" className="btn btn-outline-secondary btn-sm" >Helppi</button>
            </OverlayTrigger>{' '}</>
    )
}