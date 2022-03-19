import {Dispatch} from 'redux'
import {weatherAPI} from "../m3-dal/api";
import {CityProps} from "../m1-ui/components/searchBox/citiesList/CitiesList";
import {CurrentWeatherDataType, InitialStateType, NewCitiesListType, WeatherDataType} from "../types";

export type LoadingStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    weather: null,
    searchError: false,
    textHelper: '',
    loadingStatus: 'idle',
    searchedCityList: null,
    currentWeather: null,
    favoritesCitiesList: [],
    isAddedToFavorites: false,
    currentCity: {
        name: 'Tel-Aviv',
        key: '215805'
    },
    theme: true
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
            return {...state, favoritesCitiesList: [...action.favoritesCitiesList]}
        case 'SET-IS-ADDED-TO-FAVORITES':
            return {...state, isAddedToFavorites: action.isAddedToFavorites}
        case 'SET-THEME':
            return {...state, theme: action.theme}
        default:
            return state
    }
}

// actions
export const setWeatherAC = (weather: WeatherDataType | null) => ({type: 'SET-WEATHER', weather} as const)
export const setIsAddedToFavoritesAC = (isAddedToFavorites: boolean) => ({
    type: 'SET-IS-ADDED-TO-FAVORITES', isAddedToFavorites
} as const)
export const setCurrentWeatherAC = (currentWeather: CurrentWeatherDataType | null) => ({
    type: 'SET-CURRENT-WEATHER', currentWeather
} as const)
export const setSearchErrorAC = (searchError: boolean) => ({type: 'SET-SEARCH-ERROR', searchError} as const)
export const setCurrentCityNameAC = (currentCity: { name: string, key: string }) => ({
    type: 'SET-CURRENT-CITY', currentCity
} as const)
export const setTextHelperAC = (textHelper: string) => ({type: 'SET-TEXT-HELPER', textHelper} as const)
export const setSearchedCityListAC = (searchedCityList: Array<CityProps> | null) => ({
    type: 'SET-SEARCHED-CITY-LIST', searchedCityList
} as const)
export const setLoadingStatusAC = (loadingStatus: LoadingStatusType) => ({
    type: 'SET-LOADING-STATUS', loadingStatus
} as const)
export const setFavoritesCitiesListAC = (favoritesCitiesList: Array<{
    name: string, currentWeather: CurrentWeatherDataType }>) => ({
    type: 'SET-FAVORITE-LIST', favoritesCitiesList
} as const)
export const setThemeAC = (theme: boolean) => ({type: 'SET-THEME', theme} as const)


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

export const getFavoritesCitiesTC = (favoritesCitiesList: { cityName: string, cityKey: string }[]) => {
    return async (dispatch: ThunkDispatch) => {
        let newCitiesList: NewCitiesListType = []
        dispatch(setLoadingStatusAC('loading'))
        for (let city of favoritesCitiesList) {
            await weatherAPI.getCurrentWeatherByCity(city.cityKey).then((res) => {
                newCitiesList.push({name: city.cityName, key: city.cityKey, currentWeather: res.data})
            })
        }
        Promise.all(newCitiesList).then(() => {
            dispatch(setFavoritesCitiesListAC(newCitiesList))
            dispatch(setLoadingStatusAC('succeeded'))
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
export type setFavoritesCitiesListType = ReturnType<typeof setFavoritesCitiesListAC>;
export type setIsAddedToFavoritesType = ReturnType<typeof setIsAddedToFavoritesAC>;
export type setThemeType = ReturnType<typeof setThemeAC>;
type ActionsType =
    | setWeatherACType
    | setSearchErrorACType
    | setLoadingStatusACType
    | setTextHelperACType
    | setSearchedCityListType
    | setCurrentWeatherACType
    | setCurrentCityNameType
    | setFavoritesCitiesListType
    | setIsAddedToFavoritesType
    | setThemeType

type ThunkDispatch = Dispatch<ActionsType>


