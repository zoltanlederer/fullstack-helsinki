import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      console.log('state now: ', state)
      console.log('action', action)
      console.log('action data', action.data)
      const id = action.data.id
      // const addVoteToAnecdote = state.find(n => n.id === id)
      // const changedAnecdoteVote = {...addVoteToAnecdote, votes: addVoteToAnecdote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newVote = await anecdoteService.updateVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: newVote,
    })    
  }
}

export default reducer