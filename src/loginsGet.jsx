import React from 'react';
import axios from 'axios';

export class LoginsGet extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logins: [], recordsCount: 0 };
    }

    componentDidMount() {
        this.GetLogins("");
    }
    handleChangeInput = (ev) => {
        if (ev.target.value.length > 0) this.GetLogins(ev.target.value);
        else this.GetLogins("");
    }
    GetLogins(sukunimi) {

        let url = "";
        if (sukunimi === "") url = 'https://localhost:5001/northwind/logins';
        else url = 'https://localhost:5001/northwind/logins/' + sukunimi;

        axios.get(url)
            .then(res => {
                const recordsCount = res.data.length;
                const logins = res.data;
                console.log(logins);
                this.setState({ logins, recordsCount })
            })
            

    }
    render() {
        return (
            <div style={{ margin: "15px" }}>
                <h4 style={{ marginLeft: "10px" }}>Käyttäjät</h4>
                <div className="form-group row " style={{marginLeft:"1px"}}>
                    <input onChange={this.handleChangeInput} type="text" className="form-control" id="nimi" placeholder="Hae sukunimellä"  style={{ width: "200px" }} />   
                    <button type="button" className="btn btn-secondary btn-sm" data-toggle="modal" data-target="#helpModal">Help</button>
                    <Modal/>
                 </div>
                <table className="table table-hover" style={{ width: "calc (400px + 50vmin)" }}>
                    <thead><tr className="table-default"><td>Nimi</td><td>Sähköposti</td><td>Käyttäjätunnus</td><td>Käyttöoikeudet</td></tr></thead>
                    <tbody>
                        {this.state.logins.map(item =>
                            <tr key={item.loginId}>
                                <td>{item.firstname} {item.lastname}</td>
                                <td>{item.email}</td>
                                <td>{item.username}</td>
                                <td>{item.accesslevelId}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

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
