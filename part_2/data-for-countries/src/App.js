import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Countries from './components/Countries';


const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
    
  },[])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const countriesList = countries.filter(country => country.name.common.toLowerCase()
      .includes(search.toLowerCase()))
      .map(result => result);  

      
  return (
    <div>
      <div>
        Find countries <input value={search} onChange={handleSearch} />
      </div>
      <Countries countries={countriesList} search={search} setSearch={setSearch} />
    </div>
  );
}

export default App;