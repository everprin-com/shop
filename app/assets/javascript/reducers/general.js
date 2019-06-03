export default function (state = {}, action) {
    switch (action.type) {
      case 'CHANGE_LAST_PARAMS':
        return {...state, lastRequestParams: action.lastRequestParams} 
      case 'RESET_LAST_PARAMS':
        return {}
      case 'LOADING_ON' :
        return {...state, loading: true}
      case 'LOADING_OFF' :
        return {...state, loading: false}
      case 'SCROLL_ON' :
        return {...state, scrolling: true}
      case 'SCROLL_OFF' :
        return {...state, scrolling: false}
      case 'CHANGE_LAST_PAGE' :
        return {...state, lastPage: action.page}
      case 'DELETE_LAST_PAGE' :
        return {...state, lastPage: null}
      default:
        return state
    }
  }