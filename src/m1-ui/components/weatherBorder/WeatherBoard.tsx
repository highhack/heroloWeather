import React, {useEffect} from "react";
import {setCurrentWeatherTC, setFavoritesCitiesListAC, setIsAddedToFavoritesAC} from "../../../m2-bll/weatherReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import s from './WeatherBoard.module.scss'
import backImage from '../../common/background3.gif'
import backNightImage from '../../common/night.gif'
import Preloader from "../preloader/Preloader";
import loading from './../../common/loading.gif'
import {Button} from "@material-ui/core";
import {CurrentWeatherDataType} from "../../../types";


export  type typeProps = {
    image: (iconNumber: number) => any
}

const WeatherBoard = React.memo(({image}: typeProps) => {
        const currentWeather = useSelector<AppRootStateType, CurrentWeatherDataType | null>(state => state.weather.currentWeather)
        const currentCity = useSelector<AppRootStateType, { name: string, key: string }>(state => state.weather.currentCity)
        const isAddedToFavorites = useSelector<AppRootStateType, boolean>(state => state.weather.isAddedToFavorites)
        const favoritesCitiesList = useSelector<AppRootStateType, any>(state => state.weather.favoritesCitiesList)
        const theme = useSelector<AppRootStateType, boolean>(state => state.weather.theme)
        const localStorageFavoritesCitiesList = JSON.parse(localStorage.getItem('cities') as string) || [];
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(setCurrentWeatherTC(currentCity.key))
        }, [])

        useEffect(() => {
            localStorageFavoritesCitiesList && localStorageFavoritesCitiesList.some((city: { cityName: string, cityKey: string }) =>
                city.cityName === currentCity.name)
                ? dispatch(setIsAddedToFavoritesAC(true))
                : dispatch(setIsAddedToFavoritesAC(false))
        }, [])

        const receiveDate = (str: string) => {
            return str.substr(0, 10)
        }

        const addToFavorites = () => {
            localStorageFavoritesCitiesList.push({cityName: currentCity.name, cityKey: currentCity.key})
            localStorage.setItem('cities', JSON.stringify(localStorageFavoritesCitiesList));
            const newFavoriteCity = {name: currentCity.name, key: currentCity.key, currentWeather: currentWeather}
            favoritesCitiesList.push(newFavoriteCity)
            dispatch(setFavoritesCitiesListAC(favoritesCitiesList))
            dispatch(setIsAddedToFavoritesAC(true))
        }

        const removeFromFavorites = () => {
            const newLocalStorageFavoritesCities =
                localStorageFavoritesCitiesList.filter((city: { cityName: string, cityKey: string }) => {
                    return city.cityName !== currentCity.name
                })
            localStorage.setItem('cities', JSON.stringify(newLocalStorageFavoritesCities));
            const newFavoritesCities = favoritesCitiesList.filter((city: {
                name: string,
                currentWeather: CurrentWeatherDataType
            }) => {
                return city.name !== currentCity.name
            })
            dispatch(setFavoritesCitiesListAC(newFavoritesCities))
            dispatch(setIsAddedToFavoritesAC(false))
        }


        return (
            <div className={s.weatherBoard}
                 style={{backgroundImage: theme ? `url(${backImage})` : `url(${backNightImage})`}}>
                <Preloader loading={loading}/>
                {currentWeather === null
                    ? <div></div>
                    : <div className={s.weatherData}>
                        <div className={s.upper_container}>
                            <div className={s.cityBox}>
                                <h1>{currentCity.name}</h1>
                                <div>{receiveDate(currentWeather[0].LocalObservationDateTime)}</div>
                            </div>
                            <div>
                                {!isAddedToFavorites
                                    ? <Button className={s.button_favorites}
                                              style={{color: theme ? 'black' : 'darkgrey'}}
                                              variant="outlined"
                                              onClick={addToFavorites}>
                                        Add to favorites
                                    </Button>
                                    : <Button className={s.button_favorites}
                                              style={{color: theme ? 'black' : 'darkgrey'}}
                                              variant="outlined"
                                              onClick={removeFromFavorites}>
                                        Remove from favorites
                                    </Button>}
                            </div>
                        </div>
                        <div className={s.weatherDescription}>
                            <img className={s.img} alt={''} src={image(currentWeather[0].WeatherIcon)}/>
                            <div>{currentWeather[0].WeatherText}</div>
                        </div>
                        <div className={s.temp}>
                            <h1>{Math.floor(currentWeather[0].Temperature.Metric.Value)} <sup>o</sup>C</h1>
                        </div>
                    </div>}
            </div>
        )
    }
)

export default WeatherBoard;