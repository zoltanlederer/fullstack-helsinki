import React from 'react'

const Persons = ({persons, filter, handleDelete}) => {
    const display = persons.filter(search => search.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => {
      return ( 
        <li key={person.name}>
            {person.name}: {person.number} &nbsp;
            <button id={person.id} data-name={person.name} onClick={handleDelete}>Delete</button>
        </li>
      )
    })
  
    return (
        <ul>
            {display}
        </ul>
    )
}

export default Persons;