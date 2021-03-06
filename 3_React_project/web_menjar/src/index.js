import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './pagines/App';
import * as serviceWorker from './serviceWorker';


// inici
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,

    document.getElementsByTagName('main')[0]);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
