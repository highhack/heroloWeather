import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://dataservice.accuweather.com',
     params: {
        // apikey: 'Mutb4NaA3Kqzol0SYXrfG968f2AQsA84',
        // apikey: 'wwLCaHmLbcG1p1qjSVeBOZRJjEoUOABQ',
        // apikey: 'DA89UW5pNtuvckCm87g94ZK6jn78zvHA',
        // apikey: 'PblWy4dLUDW85h18ILYMkO0nYHcaf8Vh',
         apikey: 'x5AePgIOg4rGymL7UST1h4ALoXglJMXF',
    }
})

// api
export const weatherAPI = {
    getWeatherByCity(cityKey: string) {
            let promise = instance.get(`/forecasts/v1/daily/5day/${cityKey}`,
                {params: {metric: true}})
        return promise
            .then(response => response)

    },
    getCurrentWeatherByCity(cityKey: string) {
            let promise = instance.get(`/currentconditions/v1/${cityKey}`,
                {params: {details: false}})
        return promise
            .then(response => response)

    },
    getCitiesList(cityKey: string) {
            let promise = instance.get(`/locations/v1/cities/autocomplete`,
                {params: {q: cityKey}})
        return promise
            .then(response => response)

    },
}
