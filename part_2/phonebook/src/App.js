import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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