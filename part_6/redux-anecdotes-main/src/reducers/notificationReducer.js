const notificationReducer = (state = 'notification message comes here', action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export default notificationReducer