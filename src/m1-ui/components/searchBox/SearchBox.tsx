import React, {ChangeEvent, KeyboardEvent,  useState} from 'react';
import s from './SearchBox.module.scss'
import {setCitiesListTC, setSearchErrorAC, setTextHelperAC, setWeatherTC} from "../../../m2-bll/weatherReducer";
import {Button,FormHelperText, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import CitiesList, {CityProps} from "./citiesList/CitiesList";


const SearchBox = () => {

    // const searchError = useSelector<AppRootStateType, boolean>(state => state.weather.searchError)
    // const textHelper = useSelector<AppRootStateType, string>(state => state.weather.textHelper)
    const cityList = useSelector<AppRootStateType,Array<CityProps> | null>(state => state.weather.searchedCityList)
    let dispatch = useDispatch()
    const [citySearch, setCitySearch] = useState('')

    const onHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const writtenCity = event.currentTarget.value
        setCitySearch(writtenCity)
        dispatch(setCitiesListTC(writtenCity))
        dispatch(setSearchErrorAC(false))
        dispatch(setTextHelperAC(''))
    }

    const findWeather = () => {
        dispatch(setWeatherTC(citySearch))
        setCitySearch('')
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
            dispatch(setWeatherTC(citySearch))
            setCitySearch('')
        }
    }


    return (
        <div className={s.searchContainer}>
            <CitiesList cityList={cityList}/>
            <div className={s.searchContainer}>
                <div className={s.input}>
                    <TextField
                        id="outlined-secondary"
                        label="City"
                        variant="outlined"
                        color="secondary"
                        value={citySearch}
                        // error={searchError}
                        onKeyDown={onKeyDown}
                        onChange={onHandler}
                    />
                    {/*<FormHelperText style={{color:'red', fontFamily: `'Merienda', cursive`}}>{textHelper}</FormHelperText>*/}
                </div>
                <Button
                    style={{fontFamily: `'Merienda', cursive`}}
                    onClick={findWeather}
                    className={s.button}
                    size={'large'}
                    variant="contained" >
                    Search
                </Button>
            </div>

        </div>

    )
};

export default SearchBox;