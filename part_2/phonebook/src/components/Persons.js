import React from 'react'

const Persons = ({persons, filter}) => {
    const display = persons.filter(search => search.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => {
      return <li key={person.name}>{person.name}: {person.number}</li>
    })
  
    return (
        <ul>
            {display}
        </ul>
    )
}

export default Persons;