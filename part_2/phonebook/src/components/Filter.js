import React from 'react'

const Filter = ({newFilter, filterInput}) => {
    return (
      <div>
          Filter shown with <input value={newFilter} onChange={filterInput} />
      </div>
    )
}

export default Filter;