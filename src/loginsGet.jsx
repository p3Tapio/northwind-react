import React from 'react';
import axios from 'axios';

export class LoginsGet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logins: [],
            recordsCount: 0
        };
    }
    // Todo: clicks(?)   
    componentDidMount() {
        this.GetLogins(); 
    }
    GetLogins() {
        axios.get('https://localhost:5001/northwind/logins')
        .then(res =>{
            const recordsCount = res.data.length;
            const logins = res.data;
            this.setState({ logins, recordsCount })
        })
    }
    render() {
        return(
            <div style={{ margin: "15px" }}>
            <h4>Käyttäjät</h4>
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
  
      )}


}
