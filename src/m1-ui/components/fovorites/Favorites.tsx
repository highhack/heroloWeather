import React, {useEffect} from 'react';
import Preloader from "../preloader/Preloader";
import loading from './../../common/loading1.gif'
import s from './Favorites.module.scss'
import {CurrentWeatherDataType, favoritesCitiesListAC} from "../../../m2-bll/weatherReducer";
import {weatherAPI} from "../../../m3-dal/api";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";

export  type typeProps = {
    image: (iconNumber: number) => any
}


const Favorites = React.memo((props: typeProps) => {

    const dispatch = useDispatch()
    const cities = useSelector<AppRootStateType, any>(state => state.weather.favoritesCitiesList)
    let favoritesCitiesList = JSON.parse(localStorage.getItem('cities') as string)
    // let cities: Array<{name: string, cityWeather: CurrentWeatherDataType}> = []
    // const [cities, setCities]: any = useState([])
    // useEffect(() => {
    //     let newCitiesList: Array<{ name: string, currentWeather: CurrentWeatherDataType }> = []
    //     cities.length === 0 && favoritesCitiesList
    //         .forEach((city: { cityName: string, cityKey: string }) => {
    //                 debugger
    //                 weatherAPI.getCurrentWeatherByCity(city.cityKey)
    //                     .then(res => {
    //                         debugger
    //                         newCitiesList.push({name: city.cityName, currentWeather: res.data})
    //                     })
    //                     .catch(err => console.log(err))
    //             }
    //         )
    //     debugger
    //     console.log(newCitiesList)
    //     dispatch(favoritesCitiesListAC(newCitiesList))
    //
    // }, [])


    const image = props.image

    return (
        <div className={s.favorites}>
            <Preloader loading={loading}/>
            {localStorage === null
                ? <div>Add Cities for your favorites</div>
                : <div className={s.citesBox}>
                    <div className={s.citiesBox}>
                        {cities && cities.map((c: any) => {
                            return (
                                <div className={s.cityBox} key={c.name}>
                                    <h1>{c.name}</h1>
                                    <img className={s.img} alt={''} src={image(c.cityWeather[0].WeatherIcon)}/>
                                    <div>{c.cityWeather[0].WeatherText}</div>
                                    <div className={s.temp}>
                                        <h1>{Math.floor(c.cityWeather[0].Temperature.Metric.Value)}<sup>o</sup>C</h1>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            }
        </div>

    )
});

export default Favorites;