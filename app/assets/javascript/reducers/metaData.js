export default function (state = {}, action) {
  switch (action.type) {
    case 'ADD_META_DATA':
      const meta_data = action.meta_data || {}
      return  {
        ...state,
        ...meta_data,
        drop_ship_name: meta_data.drop_ship_name,
        headers: {
        female: JSON.parse(meta_data.headers.female),
        male: JSON.parse(meta_data.headers.male)
      },
    }
    case 'RESET_META_DATA':
      return []
    default:
      return state
  }
}
