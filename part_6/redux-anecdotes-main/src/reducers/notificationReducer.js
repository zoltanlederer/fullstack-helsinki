const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'HIDE':
      return action.notification
    default:
      return state
  }
}

let timeoutId = 0

export const setNotification = (notification, timer) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    
    dispatch({
      type: 'SET_NOTIFICATION',
      notification  
    })

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'HIDE',
        notification: null
      })
    }, timer * 1000)
  }
}

export default notificationReducer