import React, {useEffect, useState} from "react";
import {setCurrentWeatherTC} from "../../../m2-bll/weatherReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import s from './weatherBoard.module.scss'
import backImage from '../../common/background3.gif'
import Preloader from "../preloader/Preloader";
import loading from './../../common/loading.gif'
import {Button} from "@material-ui/core";


export  type typeProps = {
    image: (iconNumber: number) => any
}

const WeatherBoard = React.memo((props: typeProps) => {
        const currentWeather = useSelector<AppRootStateType, any>(state => state.weather.currentWeather)
        const currentCity = useSelector<AppRootStateType, { name: string, key: string }>(state => state.weather.currentCity)
        const favoritesCitiesList = JSON.parse(localStorage.getItem('cities') as string) || [];
        const [isAddedToFavorites, setIsAddedToFavorites] = useState(false)
        const dispatch = useDispatch()


        useEffect(() => {
            dispatch(setCurrentWeatherTC(currentCity.key))
        }, [])

        useEffect(() => {
            if (!favoritesCitiesList) {
                setIsAddedToFavorites(false)
            }
            else {
                favoritesCitiesList.some((city: { cityName: string, cityKey: string }) => city.cityName === currentCity.name)
                ? setIsAddedToFavorites(true)
                : setIsAddedToFavorites(false)
            }
        }, [])

        const image = props.image

        const receiveDate = (str: string) => {
            return str.substr(0, 10)
        }

        const addToFavorites = () => {
            favoritesCitiesList.push({cityName: currentCity.name, cityKey: currentCity.key})
            localStorage.setItem('cities', JSON.stringify(favoritesCitiesList));
            setIsAddedToFavorites(true)
        }

        const removeFromFavorites = () => {
            const newFavoritesCities = favoritesCitiesList.filter((city: { cityName: string, cityKey: string }) => {
                return city.cityName !== currentCity.name
            })
            localStorage.setItem('cities', JSON.stringify(newFavoritesCities));
            setIsAddedToFavorites(false)
        }

        console.log(currentWeather)

        return (
            <div className={s.weatherBoard} style={{backgroundImage: `url(${backImage})`}}>
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
                                              variant="outlined"
                                              onClick={addToFavorites}>
                                        Add to favorites
                                    </Button>
                                    : <Button className={s.button_favorites}
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