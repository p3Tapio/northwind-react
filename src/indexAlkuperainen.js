import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/solar/bootstrap.min.css';
import './tyyli.css';
import * as serviceWorker from './serviceWorker';
import { NavBar } from './navscript';
import {App} from './App.jsx'


ReactDOM.render(
    <div>
        <NavBar/>
        <App />
    </div>,
    document.getElementById('root'));

serviceWorker.unregister();
