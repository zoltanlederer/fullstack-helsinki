import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = async e => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(anecdote)
    props.setNotification(`New anecdote '${anecdote.split(/\s+/).slice(0,10).join(" ")}...' has added.`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(null, {createAnecdote, setNotification})(AnecdoteForm)

// export default AnecdoteForm