import React from 'react';
import s from './News.module.scss'
import news from '../../common/news.gif'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";


const News = React.memo( () => {

    const theme = useSelector<AppRootStateType, boolean>(state => state.weather.theme)

    return (
        <div className={s.news}
             style={{background: theme ?'#f09c2d' : '#22313a'}}>
            <div>
                <div>News</div>
                <img className={s.img} alt={''} src={news}/>
            </div>
        </div>

    )
});

export default News;