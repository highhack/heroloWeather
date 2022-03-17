import React from 'react';
import s from './App.module.scss';
import Routes from "./routes/Routes";
import Nav from "./components/nav/nav";
import {BrowserRouter} from "react-router-dom";



const App = () => {
    return (
        <BrowserRouter>
            <div className={s.App}>
                <Nav/>
                <Routes/>
            </div>
        </BrowserRouter>


);
}

export default App;