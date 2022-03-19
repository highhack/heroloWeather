import React from "react";
// import WeatherBoard from "../components/weatherBorder/weatherBoard";
import Board from "../components/border/Board";
import News from "../components/news/News";
import clouds from "../common/icons/clouds.png";
import sun from "../common/icons/clearSky.png";
import rain from "../common/icons/rain.png";
import darkClouds from "../common/icons/darkClouds.png";
import s from './Routes.module.scss'
import {Route, Switch} from "react-router-dom";
import WeatherBoard from "../components/weatherBorder/WeatherBoard";
import Favorites from "../components/fovorites/Favorites";


const Routes = React.memo(() => {


    const image = (iconNumber: number) => {
        if (iconNumber <= 3)
            return sun
        else if (iconNumber >= 4 && iconNumber <= 6 || (iconNumber >= 19 && iconNumber <= 23))
            return clouds
        else if ((iconNumber >= 12 && iconNumber <= 18) || (iconNumber >= 25 && iconNumber <= 29))
            return rain
        else if (iconNumber >= 7 && iconNumber <= 11)
            return darkClouds
        else return sun
    }

    return (
        <div>
            <Switch>
                <Route exact path={'/heroloWeather'} render={() =>
                    <div className={s.weather}>
                        <WeatherBoard image={image}/>
                        <Board image={image}/>
                    </div>}/>
                <Route exact path={'/favorites'} render={() =>
                    <div className={s.weather}>
                        <WeatherBoard image={image}/>
                        <Favorites image={image}/>
                    </div>}/>
                <Route exact path={'/news'} render={() =>
                    <div className={s.weatherNews}>
                        <WeatherBoard image={image}/>
                        <News/>
                    </div>}/>
            </Switch>
        </div>
    );
});

export default Routes;