 // TOFIX: defaultti jää roikkumaan ruudulle, vaikka renderöi muun sisällön. Defaulttiin anyway joku etusivu/kirjautumis-
import React from 'react';
import { CustomersGet } from './customersGet';
import { CustomersCreate } from './customersCreate';
import { LoginsGet } from './loginsGet';

export class App extends React.Component {

    render() { 
        switch (this.props.content) {
            case "CustomersGet": return (<CustomersGet />);
            case "CustomersCreate": return (<CustomersCreate />);
            case "LoginsGet": return (<LoginsGet />);
            default: return <p></p>;
        }
    }
}
