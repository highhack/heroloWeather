import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import s from'./Preloader.module.scss'
import {LoadingStatusType} from "../../../m2-bll/weatherReducer";



const Preloader = React.memo( (props: {loading: any}) => {
    let loadingStatus = useSelector<AppRootStateType, LoadingStatusType>(state => state.weather.loadingStatus);
    return (
        loadingStatus === "loading"
            ? <div ><img className={s.img} alt={''} src={props.loading}/></div>
            : <div>{}</div>
    );
});

export default Preloader;