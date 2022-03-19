import React, {useEffect} from 'react';
import Preloader from "../preloader/Preloader";
import loading from './../../common/loading1.gif'
import s from './Favorites.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {
    getFavoritesCitiesTC,
    setCurrentCityNameAC,
    setCurrentWeatherTC,
    setWeatherTC
} from "../../../m2-bll/weatherReducer";
import {CurrentWeatherDataType, FavoritesCitiesListType} from "../../../types";

export  type typeProps = {
    image: (iconNumber: number) => any
}

const Favorites = React.memo(({image}: typeProps) => {

    const dispatch = useDispatch()
    const cities =
        useSelector<AppRootStateType, FavoritesCitiesListType>(state => state.weather.favoritesCitiesList)
    const theme = useSelector<AppRootStateType, boolean>(state => state.weather.theme)


    useEffect(() => {
        let localStorageFavoritesCitiesList = JSON.parse(localStorage.getItem('cities') as string)
        localStorageFavoritesCitiesList && dispatch(getFavoritesCitiesTC(localStorageFavoritesCitiesList))
    }, [])


    const putInMainWindow = (cityKey: string, cityName: string) => {
        Promise.all([dispatch(setCurrentWeatherTC(cityKey)), dispatch(setWeatherTC(cityKey))]).then(() => {
                dispatch(setCurrentCityNameAC({name: cityName, key: cityKey}))
            }
        )
    }

    return (
        <div className={s.favorites}
             style={{background: theme ?'#f09c2d' : '#22313a'}}>
            {/*<Preloader loading={loading}/>*/}
            {cities.length !== 0
                ? <div className={s.citesBox}>
                    <div className={s.citiesBox}>
                        {cities.length !== 0 && cities.map((c: { name: string, currentWeather: CurrentWeatherDataType }) => {
                            return (
                                <div className={s.cityBox}
                                     key={c.name}
                                    // onClick={() => putInMainWindow(c.key, c.name)}
                                >
                                    <h1>{c.name}</h1>
                                    <img className={s.img} alt={''} src={image(c.currentWeather[0].WeatherIcon)}/>
                                    <div>{c.currentWeather[0].WeatherText}</div>
                                    <div className={s.temp}>
                                        <h1>{Math.floor(c.currentWeather[0].Temperature.Metric.Value)}<sup>o</sup>C</h1>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                : <div className={s.empty_favorites_text}>Add your favorites city</div>}
        </div>

    )
});

export default Favorites;