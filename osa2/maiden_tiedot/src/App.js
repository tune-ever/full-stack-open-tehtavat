import matchers from '@testing-library/jest-dom/matchers'
import axios from 'axios'
import {useState, useEffect } from 'react'

const App = () => {
  
  // Wmo weather interpretation codes:
  const wmo = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain'
  }

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState({})

  const filtered = countries.filter(country => {
    return country.name.common.toLowerCase().includes(filter)
  })

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  // getting current weather in stockholm from api:
  useEffect(() => {
    axios
      .get('https://api.open-meteo.com/v1/forecast?latitude=59.3328&longitude=18.0645&current_weather=true&windspeed_unit=ms')
      .then(response => setWeather(response.data))
  }, [])

  const handleClick = (countryName) => {
    setFilter(countryName.toLowerCase())
  }

  // tämä funktio päivittää tilaan filterin sekä filteröidyn taulukon
  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <Filter filter={filter} handleChange={handleChange} />
      <PrintData wmo={wmo} weather={weather} handleClick={handleClick} countries={filtered}/>
    </div>
  )
}


const Filter = (props) => {
  return (
  <div>
      find countries:<input value={props.filter} onChange={props.handleChange}/>
   </div>
  )
}

const PrintData = (props) => {
  if(props.countries.length === 0)
    return <p>Filter doesn't match anything</p>
  else if(props.countries.length > 10)
    return <p>Too many matches, specify another filter</p>
  else if(props.countries.length > 1)
    return props.countries.map(country => <div key={country.name.common}><p>{country.name.common}</p>
    <button onClick={() => props.handleClick(country.name.common)}>show</button></div>)
  else
    return <CountryBig wmo={props.wmo} weather={props.weather} country={props.countries} />
}

const CountryBig = (props) => {
  const country = props.country[0]
  const currentWeather = props.weather['current_weather']
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area {country.area}</p>
      <ul>
      {Object.values(country.languages)
        .map(e => <li key={e}>{e}</li>)
      }
      </ul>
      <img src={country.flags.png} />
      {country.name.common === 'Sweden' && 
      <p> temperature {currentWeather.temperature} Celsius
        <br/>
        wind {currentWeather.windspeed} m/s
        <br/>
        {props.wmo[currentWeather.weathercode]}
      </p>
      }
    </div>
  )
}

export default App;
