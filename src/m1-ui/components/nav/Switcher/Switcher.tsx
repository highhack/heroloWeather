import Switch from "@material-ui/core/Switch";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/store";
import {setThemeAC} from "../../../../m2-bll/weatherReducer";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Switcher() {

    const theme = useSelector<AppRootStateType, boolean>(state => state.weather.theme)
    const  dispatch = useDispatch()
    const changeTheme =  () => {
        dispatch(setThemeAC(!theme))
    }

    return (
        <div>
            <Switch {...label}
                    color={'primary'}
                    checked={theme}
                    onChange={changeTheme}
            />
        </div>
    );
}