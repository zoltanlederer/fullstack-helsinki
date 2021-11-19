import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState()
  const [ notificationType, setNotificationType ] = useState()


  // Persons form
  const nameInput = (e) => {setNewName(e.target.value)}
  const numberInput = (e) => {setNewNumber(e.target.value)}


  // Filter
  const filterInput = (e) => {setNewFilter(e.target.value)}


  // List Persons from database
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  
  // Add new entry / Update existing number
  const handleNewEntry = (e) => {
    e.preventDefault()
    // Check if the name already exist
    const isPersonExist = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())

    // If name doesn't exist
    if (!isPersonExist) {
      // Create new object for the new entry
      const newEntry = {
        name: newName,
        number: newNumber
      }

      // Add new entry to the database
      personService
        .create(newEntry)
        .then(returnedPersons => {
          // Update states for the display
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newName}`)
          setNotificationType('notification')
          setTimeout(() => {
            setNotification(null)
            setNotificationType(null)
          }, 5000)
        })
        .catch(error => {
          const firstIndex = error.response.data.indexOf('ValidationError')
          const lastIndex = error.response.data.indexOf('<br>')
          const errorMsg = error.response.data.slice(firstIndex + 17, lastIndex)
          setNotification(errorMsg)
          setNotificationType('warning')
          setTimeout(() => {
            setNotification(null)
            setNotificationType(null)
          }, 5000)
        })
    
    // If name already exist
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
        const id = personToUpdate[0].id;
        const updated = {...personToUpdate[0], number: newNumber}

        // Update the number in the database
        personService
          .updateNumber(id, updated)
          .then(updatePerson => {
            // Update states for the display
            const personsUpdate = [...persons]
            const personIndex = persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase())
            personsUpdate[personIndex] = updatePerson            
            
            setPersons(personsUpdate)
            setNewName('')
            setNewNumber('')
            setNotification(`Phone number updated`)
            setNotificationType('notification')
            setTimeout(() => {
              setNotification(null)
              setNotificationType(null)
            }, 5000)          
          })
          // If the user already removed
          .catch(error => {
            setNotification(`Information of ${personToUpdate[0].name} has already been removed from server`)
              setNotificationType('warning')
              setTimeout(() => {
                setNotification(null)
                setNotificationType(null)
              }, 5000)
          })
      }
    }
  }

  
  // Delete an entry
  const handleDelete = (e) => {
    const id = e.target.id    
    if (window.confirm(`Delete ${e.target.dataset.name}?`)) {
      // Delete from the database
      personService
      .deletePerson(id)
      .then(() => {
        // Update states for the display
        setPersons(persons.filter(personId => personId.id !== id))
      })
      // If the user already removed
      .catch(error => {
        setNotification(`Information of ${e.target.dataset.name} has already been removed from server`)
          setNotificationType('warning')
          setTimeout(() => {
            setNotification(null)
            setNotificationType(null)
          }, 5000)
      })      
    }    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} style={notificationType} />

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