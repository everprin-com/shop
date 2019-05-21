export default function (state = false, action) {
      switch (action.type) {
        case 'OPEN_ORDER_FORM':
          return true
        case 'CLOSE_ORDER_FORM':
          return false
        default:
          return state
      }
    }