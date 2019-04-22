export default function (state = [], action) {
    switch (action.type) {
      case 'ADD_PRODUCTS':
        return [...state, ...action.products] 
      case 'ADD_PRODUCT':
        return [...state, action.product] 
      case 'RESET_PRODUCTs':
        return [] 
      default:
        return state
    }
  }