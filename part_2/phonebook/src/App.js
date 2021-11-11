import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  // Persons form
  const nameInput = (e) => {setNewName(e.target.value)}
  const numberInput = (e) => {setNewNumber(e.target.value)}

  const handleNewEntry = (e) => {
    e.preventDefault()
    const isPersonExist = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())

    if (!isPersonExist) {
      const newEntry = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newEntry))
      setNewName('')
      setNewNumber('')
      
    } else {
      alert(`${newName} is already added to phonebook`)    
    }
  }

  // Filter
  const filterInput = (e) => {setNewFilter(e.target.value)}

 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} filterInput={filterInput} />
      
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleNewEntry}
        newName={newName}
        newNumber={newNumber}
        nameInput={nameInput}
        numberInput={numberInput}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App