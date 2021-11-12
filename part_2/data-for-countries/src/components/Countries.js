import React from 'react';
import CountryData from './CountryData';

const Countries = ({countries, search, setSearch}) => {    
    if (search === '') {
        return <p>Please search countries</p>

    } else if (countries.length >= 10) {

        return <p>Too many matches, specify another filter</p>

    } else if (countries.length > 1) {
        
        return countries.map(country => (
        <p key={country.population}>
            {country.name.common}
            <button 
            id={country.name.common}
            onClick={(e) => {setSearch(e.target.id)}}
            >Show
            </button>
        </p>
        ))

    } else if (countries.length === 1) {
        return <CountryData countries={countries} />

    } else {
        return <p>Country has not found</p>
    }
}

export default Countries;