export default function (state = [], action) {
    switch (action.type) {
      case 'ADD_META_DATAS':
       console.log("dd")
       console.log(action)
        return [] //[...state, ...action.meta_datas]
      case 'ADD_META_DATA':
        return  state.some(meta_data=>meta_data.id==action.meta_data.id) ? [...state] : [...state, action.product]
      case 'RESET_META_DATAS':
        return []
      default:
        return state
    }
  }
