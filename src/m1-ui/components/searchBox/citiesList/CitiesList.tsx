import * as React from 'react';
import {Box, ListItem, ListItemText} from "@material-ui/core";
import s from './CitiesList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    setCurrentCityNameAC,
    setCurrentWeatherTC, setIsAddedToFavoritesAC,
    setSearchedCityListAC,
    setWeatherTC
} from "../../../../m2-bll/weatherReducer";
import {AppRootStateType} from "../../../../m2-bll/store";
import {CurrentWeatherDataType} from "../../../../types";

export type CityProps = {
    key: string,
    name: string
}

export type CitiesListProps = {
    cityList: Array<CityProps> | null
}


export default function CitiesList({cityList}: CitiesListProps) {

    const favoritesCitiesList = useSelector<AppRootStateType, any>(state => state.weather.favoritesCitiesList)
    const dispatch = useDispatch()

    const receiveCityWeather = (cityKey: string, cityName: string) => {
        Promise.all([dispatch(setCurrentWeatherTC(cityKey)), dispatch(setWeatherTC(cityKey))]).then(() => {
                dispatch(setCurrentCityNameAC({name: cityName, key: cityKey}))
                dispatch(setSearchedCityListAC(null))
            favoritesCitiesList.some((city: { name: string, currentWeather: CurrentWeatherDataType }) => city.name === cityName)
                ? dispatch(setIsAddedToFavoritesAC(true))
                : dispatch(setIsAddedToFavoritesAC(false))
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