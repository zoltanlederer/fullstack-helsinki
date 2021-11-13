import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

      personService
        .create(newEntry)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
        })
      
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number?`)) {
        const personToUpdate = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
        const id = personToUpdate[0].id;
        const updated = {...personToUpdate[0], number: newNumber}

        personService
          .updateNumber(id, updated)
          .then(updatePerson => {
            const personsUpdate = [...persons]
            const personIndex = persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase())
            personsUpdate[personIndex] = updatePerson
            
            setPersons(personsUpdate)
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const handleDelete = (e) => {
    const id = parseInt(e.target.id)    
    if (window.confirm(`Delete ${e.target.dataset.name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(personId => personId.id !== id))
      })
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
      <Persons persons={persons} filter={newFilter} handleDelete={(e) => handleDelete(e)} />
    </div>
  )
}

export default App