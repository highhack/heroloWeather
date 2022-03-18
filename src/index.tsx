import React from 'react';
import './index.css';
import App from './../src/m1-ui/App';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import { HashRouter } from 'react-router-dom';
import { store } from './m2-bll/store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<HashRouter>*/}
                <App/>
            {/*</HashRouter>*/}
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
