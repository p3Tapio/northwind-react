import React, { Component } from 'react'

export default class ProductDeleteModal extends Component {

    handleClickDelete() {
        this.props.deleteFunction(this.props.productToEdit.productId);
    }
    render() {
        return (
            <div className="modal fade" id="DeleteModal" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLabel">Haluatko varmasti poistaa tuoteen: <br/> "{this.props.productToEdit.productName}"? </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.handleClickDelete.bind(this)} type="button" className="btn btn-outline-warning" data-dismiss="modal">Poista</button>
                            <button type="button" className="btn btn-outline-success" data-dismiss="modal">Peruuta</button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}