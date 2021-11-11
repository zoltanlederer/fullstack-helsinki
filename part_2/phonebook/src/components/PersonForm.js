import React from 'react'

const PersonForm = ({handleSubmit, newName, newNumber, nameInput, numberInput}) => {
    return (
      <div>
          <form onSubmit={handleSubmit}>
          <div>
            Name: <input value={newName} onChange={nameInput} />
          </div>
          <div>
            Number: <input value={newNumber} onChange={numberInput} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
          </form>
      </div>
    )
  }

export default PersonForm;