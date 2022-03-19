import React from 'react';
import s from './App.module.scss';
import Routes from "./routes/Routes";
import Nav from "./components/nav/Nav";
import {BrowserRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../m2-bll/store";



const App = () => {

    const theme = useSelector<AppRootStateType, boolean>(state => state.weather.theme)

    return (
        <BrowserRouter>
            <div className={s.App}
                 style={{color: theme ? 'black' : 'darkgrey'}}>
                <Nav/>
                <Routes/>
            </div>
        </BrowserRouter>


);
}

export default App;