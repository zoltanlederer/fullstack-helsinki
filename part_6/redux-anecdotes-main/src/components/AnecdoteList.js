import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = anecdotes.filter(el => el.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    if (filter === 'ALL') {
      return anecdotes
    }
    return filteredAnecdotes
  })

  // anecdotes are ordered by the number of votes
  anecdotes.sort((a, b) => (
    b.votes - a.votes
  ))

  const handleVote = (id, content) => {
    console.log('VOTE')
    dispatch(voteAnecdote(id))
    dispatch(notificationChange(`You voted '${content.split(/\s+/).slice(0,10).join(" ")}...'`))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList