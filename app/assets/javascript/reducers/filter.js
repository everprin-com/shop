export default function (state = {}, action) {
    switch (action.type) {
      case 'ADD_FILTER':
        return {...state, ...action.filter} 
      case 'RESET_FILTER':
        return {}
      default:
        return state
    }
  }