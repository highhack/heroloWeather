import React  from 'react';
import s from './Nav.module.scss'
import {NavLink} from 'react-router-dom';
import Switcher from "./Switcher/Switcher";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";

const Nav = React.memo(() => {

    const theme = useSelector<AppRootStateType, boolean>(state => state.weather.theme)
    return (
        <div className={s.nav}
             style={{background: theme ?'#f09c2d' : '#22313a'}}>
            <div className={s.nav_block}>
                Weather
            </div>
            <div className={s.right_panel}>
                <Switcher/>
                <nav className={s.nav_block}>
                    <div className={s.item}>
                        <NavLink to='/heroloWeather' activeClassName={s.active}>Weather</NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink to='/favorites' activeClassName={s.active}>Favorites</NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink to='/news' activeClassName={s.active}>News</NavLink>
                    </div>
                </nav>
            </div>
        </div>
    )
});

export default Nav;