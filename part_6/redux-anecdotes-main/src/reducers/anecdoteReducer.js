const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      console.log('state now: ', state)
      console.log('action', action)
      const id = action.data.id
      const addVoteToAnecdote = state.find(n => n.id === id)
      const changedAnecdoteVote = {...addVoteToAnecdote, votes: addVoteToAnecdote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdoteVote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export default reducer