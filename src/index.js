import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/solar/bootstrap.min.css';
import './tyyli.css';
import * as serviceWorker from './serviceWorker';
import { NavBar } from './navscript';
import { CustomersGet } from './customersGet';
// import { LoginsGet } from './loginsGet';

ReactDOM.render(
    <div>
        <NavBar />
        <CustomersGet/>
        {/* <LoginsGet/> */}
    </div>,
    document.getElementById('root'));

serviceWorker.unregister();
