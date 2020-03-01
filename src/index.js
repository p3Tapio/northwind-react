import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/solar/bootstrap.min.css';
import './tyyli.css';
import * as serviceWorker from './serviceWorker';
import { NavBar } from './navscript';
import { CustomersFetch } from './customersFetch';

ReactDOM.render(
    <div>
        <NavBar />
        <CustomersFetch/>
    </div>,
    document.getElementById('root'));

serviceWorker.unregister();
