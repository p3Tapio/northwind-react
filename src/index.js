import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/solar/bootstrap.min.css';
import './tyyli.css';
import * as serviceWorker from './serviceWorker';
import Navigator from './Navigator';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
    <BrowserRouter>
        <Navigator />
    </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
