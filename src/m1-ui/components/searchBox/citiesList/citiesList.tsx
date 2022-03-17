import * as React from 'react';
import {Box, ListItem, ListItemText} from "@material-ui/core";
import s from './citiesList.module.scss'
import {useDispatch} from "react-redux";
import {
    setCurrentCityNameAC,
    setCurrentWeatherTC,
    setSearchedCityListAC,
    setWeatherTC
} from "../../../../m2-bll/weatherReducer";

export type CityProps = {
    key: string,
    name: string
}

export type CitiesListProps = {
    cityList: Array<CityProps> | null
}


export default function CitiesList({cityList}: CitiesListProps) {

    const dispatch = useDispatch()

    const receiveCityWeather = (cityKey: string, cityName: string) => {
        Promise.all([dispatch(setCurrentWeatherTC(cityKey)), dispatch(setWeatherTC(cityKey))]).then(() => {
                dispatch(setCurrentCityNameAC({name: cityName, key: cityKey}))
                dispatch(setSearchedCityListAC(null))
            }
        )
    }
    return (
        <Box className={s.cities_list}>
            {cityList && cityList.map(city =>
                <ListItem
                    key={city.key}
                    className={s.city_name_block}
                    onClick={() => receiveCityWeather(city.key, city.name)}
                >
                    <ListItemText primary={city.name}/>
                </ListItem>
            )}
        </Box>
    );
}