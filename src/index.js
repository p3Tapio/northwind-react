import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/solar/bootstrap.min.css'; 
import './tyyli.css'; 
import * as serviceWorker from './serviceWorker';
import { NavBar } from './navscript';

ReactDOM.render(
    <NavBar/>,
    document.getElementById('root'));

serviceWorker.unregister();
