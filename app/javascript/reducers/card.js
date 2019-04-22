export default function (state = { data: [], isOpen: false }, action) {
  console.log(state)
    switch (action.type) {
      case 'PUT_TO_CART':
        return {...state, data: [...state.data, action.product]}
      case 'OPEN_CART':
        return {...state, isOpen: true}
      case 'CLOSE_CART':
        return {...state, isOpen: false} 
      default:
        return state
    }
  }