export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_META_DATAS':
      const meta_datas = action.meta_datas || {}
      const headers = meta_datas.headers || {}
      console.log("reduc")
      console.log(headers)
      return  { ...state, headers: JSON.parse(headers) }
    case 'ADD_META_DATA':
      return  state.some(meta_data=>meta_data.id==action.meta_data.id) ? [...state] : [...state, action.product]
    case 'RESET_META_DATAS':
      return []
    default:
      return state
  }
}
