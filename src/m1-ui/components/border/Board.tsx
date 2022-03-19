import React, {useEffect} from 'react';
import s from './Board.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {setWeatherTC} from "../../../m2-bll/weatherReducer";
import Preloader from "../preloader/Preloader";
import loading from './../../common/loading1.gif'
import SearchBox from "../searchBox/SearchBox";
import {ListDataType} from "../../../types";

export  type typeProps = {
    image: (iconNumber: number) => any
}

const Board = React.memo((props: typeProps) => {
    const weather = useSelector<AppRootStateType, any>(state => state.weather.weather)
    const currentCity = useSelector<AppRootStateType, { name: string, key: string }>(state => state.weather.currentCity)
    const theme = useSelector<AppRootStateType, boolean>(state => state.weather.theme)
    let dispatch = useDispatch()


    useEffect(() => {
        dispatch(setWeatherTC(currentCity.key))
    }, [])

    const image = props.image

    return (
        <div className={s.board}
        style={{background: theme ?'#f09c2d' : '#22313a'}}>
            <Preloader loading={loading}/>
            {weather === null
                ? <div>{}</div>
                : <div className={s.board_container}>
                    <SearchBox/>
                    <div className={s.daysBox}>
                        {weather.DailyForecasts.map((n:ListDataType, index: number) => {
                                return <div key={index} className={s.dayBox}>
                                    <div>{n.Date.substr(0, 10)}</div>
                                    <img className={s.img} alt={''} src={image(n.Day.Icon)}/>
                                    <div className={s.minMax}>
                                        <div>
                                            <div>Min</div>
                                            <div className={s.minTemp}>{Math.floor(n.Temperature.Minimum.Value)}
                                                <sup>o</sup>C
                                            </div>
                                        </div>
                                        <div>
                                            <div>Max</div>
                                            <div className={s.maxTemp}>{Math.floor(n.Temperature.Maximum.Value)}
                                                <sup>o</sup>C
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        )}
                    </div>
                </div>
               }
        </div>

    )
});

export default Board;