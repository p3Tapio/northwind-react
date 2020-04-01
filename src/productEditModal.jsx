import React from 'react';
import axios from 'axios';

export default class ProductEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suppliers: [], categories: [], productName: '',
            categoryId: '', supplierId: '', quantityPerUnit: '', unitPrice: '',
            unitsInStock: '', unitsOnOrder: '', reorderLevel: '', discontinued: ''
        };
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }
    componentDidMount() {
        axios.get('https://localhost:5001/northwind/products/categories').then(res => {
            const categories = res.data;
            this.setState({ categories });
        })
        axios.get('https://localhost:5001/northwind/products/suppliers').then(res => {
            const suppliers = res.data;
            this.setState({ suppliers });
        })
    }
    handleChangeInput(ev) {

        if (ev.target.id === 'discontinued') {
            if (ev.target.options.selectedIndex === 1) {
                this.setState({ discontinued: !this.props.productToEdit.discontinued });
            }
        } else if (ev.target.id === 'supplier') {
            this.setState({ supplierId: ev.target.options.selectedIndex });
        } else if (ev.target.id === 'category') {
            this.setState({ categoryId: ev.target.options.selectedIndex });
        } else {
            this.setState({ ...this.state, [ev.target.id]: ev.target.value });
        }
    }
    handleClickTallenna(ev) {

        ev.preventDefault();

        let productName = this.state.productName; let categoryId = this.state.categoryId; let supplierId = this.state.supplierId;
        let quantityPerUnit = this.state.quantityPerUnit; let unitPrice = this.state.unitPrice; let unitsInStock = this.state.unitsInStock;
        let unitsOnOrder = this.state.unitsOnOrder; let reorderLevel = this.state.reorderLevel;
        let discontinued = this.state.discontinued;
        // --- 
        if (productName === '') productName = this.props.productToEdit.productName;
        if (categoryId === '') categoryId = this.props.productToEdit.categoryId;
        if (supplierId === '') supplierId = this.props.productToEdit.supplierId;
        if (quantityPerUnit === '') quantityPerUnit = this.props.productToEdit.quantity;
        if (unitPrice === '') unitPrice = this.props.productToEdit.unitPrice;
        if (unitsInStock === '') unitsInStock = this.props.productToEdit.unitsInStock;
        if (unitsOnOrder === '') unitsOnOrder = this.props.productToEdit.unitsOnOrder;
        if (reorderLevel === '') reorderLevel = this.props.productToEdit.reorderLevel;
        if (discontinued === '') discontinued = this.props.productToEdit.discontinued;
        // --- 
        const editJson = JSON.stringify({
            productName: productName,
            categoryId: categoryId,
            supplierId: supplierId,
            quantityPerUnit: quantityPerUnit,
            unitPrice: unitPrice,
            unitsInStock: unitsInStock,
            unitsOnOrder: unitsOnOrder,
            reorderLevel: reorderLevel,
            discontinued: discontinued
        })

        this.saveEdit(editJson);
    }
    saveEdit(eJson) {

        fetch('https://localhost:5001/northwind/products/update/' + this.props.productToEdit.productId, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: eJson
        }).then((res) => res.json())
            .then((json) => {
                const success = json;
                if (success) {
                    this.handleModalClose();
                }
            }).catch(err => {
                console.log(err);
            });


    }
    handleModalClose() {
        this.props.clearProductToEdit();
    }
    render() {
        var booli, booli2, saatavilla, saatavilla2;
        const categoryList = this.state.categories.map(category => <option key={category.categoryId} data-key={category.categoryId} style={{ width: "280px" }} >{category.categoryName}</option>);
        const supplierList = this.state.suppliers.map(supplier => <option key={supplier.supplierId} data-key={supplier.supplierId} style={{ width: "280px" }} >{supplier.companyName}</option>);
        if (this.props.productToEdit.unitPrice !== undefined) var unitP = this.props.productToEdit.unitPrice.toFixed(2);
        if (this.props.productToEdit.discontinued) {
            booli = true; saatavilla = "Ei"; booli2 = false; saatavilla2 = "Kyllä";
        } else { booli = false; saatavilla = "Kyllä"; booli2 = true; saatavilla2 = "Ei" }

        return (

            <div className="modal fade" id="EditModal" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLabel">Muokkaa tuotetietoja </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleModalClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.handleClickTallenna.bind(this)}>
                            <div className="modal-body">
                                <input type="text" title="Tuotteen nimi" onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="productName" defaultValue={this.props.productToEdit.productName} />
                                <select style={{ width: "280px" }} onChange={this.handleChangeInput} className="form-control" id="supplier" title="Tuottaja">
                                    <option data-key={this.props.productToEdit.supplierId}>{this.props.productToEdit.suppliername}</option>
                                    {supplierList}
                                </select>
                                <select onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="category" title="Tuotekategoria">
                                    <option data-key={this.props.productToEdit.categoryId}>{this.props.productToEdit.categoryName}</option>
                                    {categoryList}
                                </select>
                                <input type="text" title="Kappalemäärä" onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="quantityPerUnit" defaultValue={this.props.productToEdit.quantity} />
                                <input type="text" title="Hinta" onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="unitPrice" defaultValue={unitP} />
                                <input type="text" title="Varastossa" onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="unitsInStock" defaultValue={this.props.productToEdit.unitsInStock} />
                                <input type="text" title="Tilaukset" onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="unitsOnOrder" defaultValue={this.props.productToEdit.unitsOnOrder} />
                                <input type="text" title="Uudelleen tilaukset" onChange={this.handleChangeInput} className="form-control" style={{ width: "280px" }} id="reorderLevel" defaultValue={this.props.productToEdit.reorderLevel} />
                                <label className="form-check-label" style={{ marginLeft: '-12px', marginRight: "35px" }}>Saatavilla</label>
                                <select onChange={this.handleChangeInput} className="form-control" style={{ width: "100px" }} id="discontinued">
                                    <option data-key={booli}>{saatavilla}</option>
                                    <option data-key={booli2}>{saatavilla2}</option>
                                </select>
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button onClick={this.handleModalClose} type="button" className="btn btn-outline-warning" data-dismiss="modal">Poistu</button>
                            <button onClick={this.handleClickTallenna.bind(this)} type="button" className="btn btn-outline-success" data-dismiss="modal">Tallenna</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
//  <input type="checkbox" id="discontinued" onClick={() => checked = !this.props.productToEdit.discontinued === false ? true : false}  onChange={this.handleChangeInput} className="form-check-input" checked={!this.props.productToEdit.discontinued}/>