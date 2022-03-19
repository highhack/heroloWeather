import {CityProps} from "./m1-ui/components/searchBox/citiesList/CitiesList";
import {LoadingStatusType} from "./m2-bll/weatherReducer";

export type InitialStateType = {
    weather: WeatherDataType | null
    searchError: boolean
    textHelper: string
    loadingStatus: LoadingStatusType
    searchedCityList: Array<CityProps> | null
    currentWeather: CurrentWeatherDataType | null
    favoritesCitiesList: FavoritesCitiesListType
    isAddedToFavorites: boolean,
    currentCity: {
        name: string,
        key: string
    }
    theme: boolean
}

export type FavoritesCitiesListType = { name: string, currentWeather: CurrentWeatherDataType }[]
export type NewCitiesListType = { name: string, key: string, currentWeather: CurrentWeatherDataType }[]


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
    "DailyForecasts": Array<ListDataType>
}

export type ListDataType = {
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
