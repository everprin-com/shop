export default function (state = {status: false, id: null}, action) {
      switch (action.type) {
        case 'SHOW_SET_SIZE_WINDOW':
          return {id: action.id, status: true}
        case 'CLOSE_SET_SIZE_WINDOW':
          return {id: null, status: false}
        default:
          return state
      }
    }