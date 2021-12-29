const notificationReducer = (state = null, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'HIDE':
      return action.notification
    default:
      return state
  }
}

export const notificationChange = notification => {
  return (
    {
      type: 'SET_NOTIFICATION',
      notification
    }
  )
}

export default notificationReducer