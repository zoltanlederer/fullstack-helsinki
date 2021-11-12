import React from 'react';
import Weather from './Weather'

const CountryData = ({countries}) => {
    return countries.map(country => (
    <div key={country.population}>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Population: {country.population}</p>
      <h2>Language(s)</h2>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <p>
        <img src={country.flags.png} alt={country.name.common} width='100px'/>
      </p>
      <Weather capital={country.capital[0]} />
    </div>
  ))
}

export default CountryData;