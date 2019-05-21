export default function (state = {}, action) {
    switch (action.type) {
      case 'ADD_PRODUCTS_TO_SLIDER':
        return {...state, products: [...action.products]}
      default:
        return state
    }
  }