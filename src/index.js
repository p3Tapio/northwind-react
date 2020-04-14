import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/solar/bootstrap.min.css';
import './tyyli.css';
import * as serviceWorker from './serviceWorker';
import Navigator from './Navigator';
import { HashRouter } from 'react-router-dom';

ReactDOM.render((
    <HashRouter>
        <Navigator />
    </HashRouter>
), document.getElementById('root'));

serviceWorker.unregister();
