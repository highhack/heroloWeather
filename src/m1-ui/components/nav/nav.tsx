import React from 'react';
import s from './nav.module.scss'
import {NavLink, Switch} from 'react-router-dom';


const Nav = React.memo(() => {
    return (
        <Switch>
        <nav className={s.nav}>
            <div className={s.nav_block}>
                Weather
            </div>
            <div className={s.nav_block}>
                <div className={s.item}>
                    <NavLink to='/' activeClassName={s.active}>Weather</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to='/favorites' activeClassName={s.active}>Favorites</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to='/news' activeClassName={s.active}>News</NavLink>
                </div>
            </div>
        </nav>
         </Switch>
    )
});

export default Nav;