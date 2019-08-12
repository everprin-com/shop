export default function(state = { filter: { sex: ["wooman"] } }, action) {
  switch (action.type) {
    case "ADD_FILTER":
      return { ...state, filter: { ...action.filter } };
    case "RESET_FILTER":
      return { ...state, filter: {} };
    case "ADD_FILTER_OPTIONS":
      return { ...state, filterOptions: { ...action.filterOptions } };
    case "RESET_FILTER_OPTIONS":
      return { ...state, filterOptions: {} };
    default:
      return state;
  }
}
