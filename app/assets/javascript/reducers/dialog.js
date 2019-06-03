export default function (state = { size: { status: false, id: null }, successOrder: { status: false}}, action) {
      switch (action.type) {
        case 'SHOW_SET_SIZE_WINDOW':
          return { size: {id: action.id, status: true}, successOrder: {...state.successOrder} }
        case 'CLOSE_SET_SIZE_WINDOW':
          return { size: {id: null, status: false}, successOrder: {...state.successOrder} }
        case 'SHOW_SUCCESS_WINDOW':
          return { size: {...state.size}, successOrder: {status: true} }
        case 'CLOSE_SUCCESS_WINDOW':
          return { size: {...state.size}, successOrder: {status: false} }
        default:
          return state
      }
    }