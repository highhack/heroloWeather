import {Dispatch} from 'redux'
import {weatherAPI} from "../m3-dal/api";
import {CityProps} from "../m1-ui/components/searchBox/citiesList/citiesList";

export type InitialStateType = {
    weather: WeatherDataType | null
    searchError: boolean
    textHelper: string
    loadingStatus: LoadingStatusType
    searchedCityList: Array<CityProps> | null
    currentWeather: CurrentWeatherDataType | null
    favoritesCitiesList: Array<{
        name: string,
        currentWeather: CurrentWeatherDataType
    }> | Array<null>
    currentCity: {
        name: string,
        key: string
    }
}

export type LoadingStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    weather: null,
    searchError: false,
    textHelper: '',
    loadingStatus: 'idle',
    searchedCityList: null,
    currentWeather: null,
    favoritesCitiesList: [],
    currentCity: {
        name: 'Tel-Aviv',
        key: '215805'
    }
} as InitialStateType

export const weatherReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-WEATHER':
            return {...state, weather: action.weather}
        case 'SET-CURRENT-WEATHER':
            return {...state, currentWeather: action.currentWeather}
        case 'SET-SEARCH-ERROR':
            return {...state, searchError: action.searchError}
        case 'SET-TEXT-HELPER':
            return {...state, textHelper: action.textHelper}
        case 'SET-LOADING-STATUS':
            return {...state, loadingStatus: action.loadingStatus}
        case 'SET-SEARCHED-CITY-LIST':
            return {...state, searchedCityList: action.searchedCityList}
        case 'SET-CURRENT-CITY':
            return {...state, currentCity: action.currentCity}
        case 'SET-FAVORITE-LIST':
             let a = {...state, favoritesCitiesList: action.favoritesCitiesList}
             return a
        default:
            return state
    }
}

// actions
export const setWeatherAC = (weather: WeatherDataType | null) => ({type: 'SET-WEATHER', weather} as const)
export const setCurrentWeatherAC = (currentWeather: CurrentWeatherDataType | null) => ({
    type: 'SET-CURRENT-WEATHER',
    currentWeather
} as const)
export const setSearchErrorAC = (searchError: boolean) => ({type: 'SET-SEARCH-ERROR', searchError} as const)
export const setCurrentCityNameAC = (currentCity: { name: string, key: string }) => ({
    type: 'SET-CURRENT-CITY',
    currentCity
} as const)
export const setTextHelperAC = (textHelper: string) => ({type: 'SET-TEXT-HELPER', textHelper} as const)
export const setSearchedCityListAC = (searchedCityList: Array<CityProps> | null) => ({
    type: 'SET-SEARCHED-CITY-LIST',
    searchedCityList
} as const)
export const setLoadingStatusAC = (loadingStatus: LoadingStatusType) => ({
    type: 'SET-LOADING-STATUS',
    loadingStatus
} as const)
export const favoritesCitiesListAC = (favoritesCitiesList: Array<{
    name: string,
    currentWeather: CurrentWeatherDataType
}>) => ({
    type: 'SET-FAVORITE-LIST',
    favoritesCitiesList
} as const)


// thunks
export const setWeatherTC = (cityKey: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        dispatch(setWeatherAC(null))
        weatherAPI.getWeatherByCity(cityKey)
            .then(res => res.data)
            .then((data: WeatherDataType) => {
                    dispatch(setLoadingStatusAC('succeeded'))
                    dispatch(setWeatherAC(data))
                }
            )
            .catch((error) => {
                dispatch(setSearchErrorAC(true))
                dispatch(setTextHelperAC('Wrong name of city'))
                dispatch(setLoadingStatusAC('succeeded'))
                // console.log(error.response.data.Message)
            })
    }
}

export const setCurrentWeatherTC = (cityKey: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        dispatch(setWeatherAC(null))
        weatherAPI.getCurrentWeatherByCity(cityKey)
            .then(res => res.data)
            .then((data: CurrentWeatherDataType) => {
                    dispatch(setLoadingStatusAC('succeeded'))
                    dispatch(setCurrentWeatherAC(data))
                }
            )
            .catch((error) => {
                dispatch(setSearchErrorAC(true))
                dispatch(setTextHelperAC('try again'))
                dispatch(setLoadingStatusAC('succeeded'))
                console.log(error.message)
            })
    }
}

export const setCitiesListTC = (writtenCity: string) => {
    return (dispatch: ThunkDispatch) => {
        weatherAPI.getCitiesList(writtenCity)
            .then(res => {
                    let cities = res.data.map((city: any) => {
                        return {key: city.Key, name: city.LocalizedName}
                    })
                    dispatch(setSearchedCityListAC(cities))
                }
            )
            .catch((error) => {
                console.log(error)
            })
    }
}


// types
export type setWeatherACType = ReturnType<typeof setWeatherAC>;
export type setCurrentWeatherACType = ReturnType<typeof setCurrentWeatherAC>;
export type setSearchErrorACType = ReturnType<typeof setSearchErrorAC>;
export type setTextHelperACType = ReturnType<typeof setTextHelperAC>;
export type setLoadingStatusACType = ReturnType<typeof setLoadingStatusAC>;
export type setSearchedCityListType = ReturnType<typeof setSearchedCityListAC>;
export type setCurrentCityNameType = ReturnType<typeof setCurrentCityNameAC>;
export type favoritesCitiesListType = ReturnType<typeof favoritesCitiesListAC>;
type ActionsType =
    | setWeatherACType
    | setSearchErrorACType
    | setLoadingStatusACType
    | setTextHelperACType
    | setSearchedCityListType
    | setCurrentWeatherACType
    | setCurrentCityNameType
    | favoritesCitiesListType

type ThunkDispatch = Dispatch<ActionsType>

export type WeatherDataType = {
    "Headline": {
        "EffectiveDate": string,
        "EffectiveEpochDate": number,
        "Severity": number,
        "Text": string,
        "Category": string,
        // "EndDate": null,
        // "EndEpochDate": null,
        "MobileLink": string,
        "Link": string
    },
    "DailyForecasts": Array<listData>
}

export type listData = {
    "Date": string,
    "Day": {
        HasPrecipitation: boolean,
        Icon: number
        IconPhrase: string,
        PrecipitationIntensity: string,
        PrecipitationType: string
    },
    Night: {
        HasPrecipitation: boolean,
        Icon: number,
        IconPhrase: string
    }
    "EpochDate": number,
    "Temperature": {
        "Minimum": {
            "Value": number,
            "Unit": string,
            "UnitType": number
        },
        "Maximum": {
            "Value": number,
            "Unit": string,
            "UnitType": number
        }
    }
}

export type CurrentWeatherDataType = [
    {
        "LocalObservationDateTime": string,
        "EpochTime": number,
        "WeatherText": string,
        "WeatherIcon": number,
        "HasPrecipitation": boolean,
        // "PrecipitationType": null,
        "IsDayTime": boolean,
        "Temperature": {
            "Metric": {
                "Value": number,
                "Unit": string,
                "UnitType": number
            },
            "Imperial": {
                "Value": number,
                "Unit": string,
                "UnitType": number
            }
        },
        "MobileLink": string,
        "Link": string
    }
]
