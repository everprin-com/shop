export default function (state = {}, action) {
  console.log(state)
    switch (action.type) {
      case 'ADD_PRODUCT':
        return [...state, action.product] 
      default:
        return state
    }
  }