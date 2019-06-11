export default function (state = [], action) {
    switch (action.type) {
      case 'ADD_PRODUCTS':
        return [...state, ...action.products] 
      case 'ADD_PRODUCT':
        return  state.some(product=>product.id==action.product.id) ? [...state] : [...state, action.product] 
      case 'RESET_PRODUCTS':
        return []
      case 'RESET_AND_ADD_PRODUCTS':
        return [...action.products]
      case 'SET_ACTIVE_SIZE':
        return [...state.map(product => { return (
          product.id === action.id ? {...product, activeSize: action.size} : product
        )})]
      default:
        return state
    }
  }