import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Countries = ({countries, search}) => {
  console.log(countries);
  if (search === '') {
    return <p>Please search countries</p>
  } else if (countries.length >= 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length > 1) {
    return countries.map(country => <p key={country.population}>{country.name.common}</p>)
  } else if (countries.length === 1) {
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
      </div>
    ))
  } else {
    return <p>Country has not found</p>
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://cors-anywhere.herokuapp.com/https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const displayResult = countries.filter(country => country.name.common.toLowerCase()
      .includes(search.toLowerCase()))
      .map(result => result);  

      
  return (
    <div>
      <div>
        Find countries <input value={search} onChange={handleSearch} />
      </div>
      <Countries countries={displayResult} search={search} />
    </div>
  );
}

export default App;
