import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Weather = ({capital}) => {  
    const [data, setData] = useState('')

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${capital}&appid=${api_key}`)
        .then(response => {
        setData(response.data)
        })
    },[capital])

    return (
        <div>
        {
        data === '' ? <><p>Loading weather info...</p></> :
            <>
            <h2>Weather in {data.name}</h2>
            <p><strong>Temperature: </strong>{data.main.temp} C</p>
            <p><strong>Wind: </strong>{data.wind.speed} kph</p>
            </>
        }
        </div>
    )
}

export default Weather;