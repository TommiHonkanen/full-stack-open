import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [weather, setWeather] = useState({
        weather: [
        {
        icon: "01d"
        }
        ],
        main: {
        temp: 0,
        },
        wind: {
        speed: 0,
        },
    })

    const api_key = process.env.REACT_APP_API_KEY

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${api_key}`

    useEffect(() => {
        axios
        .get(url)
        .then(response => {
            setWeather(response.data)
        })
    }, [url])

    return (
        <div>
            <h2>Weather in {props.capital}</h2>
            <p>Temperature: {weather.main.temp - 273.15} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}alt=""/>
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather