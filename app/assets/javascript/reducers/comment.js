export default function(state = { data:[] }, action) {
  switch (action.type) {
    case "ADD_COMMENT":
      return { ...state, data: [...state.data, action.data] };
    case "RESET_COMMENTS":
      return { ...state, data: [] };
    default:
      return state;
  }
}
