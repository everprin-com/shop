export default function(state = { filter: { sex: ["wooman"] }, showNoProducts: false }, action) {
  switch (action.type) {
    case "ADD_FILTER":
      return { ...state, filter: { ...state.filter, ...action.filter } };
    case "RESET_FILTER":
      return { ...state, filter: {} };
    case "RESET_FILTER_WITHOUT_SEX":
      return { ...state, filter: { sex: state.filter.sex } };
    case "RESET_FILTER_WITHOUT_SEX_AND_REQUEST":
      return { ...state, filter: { sex: state.filter.sex } };
    case "ADD_FILTER_OPTIONS":
      return { ...state, filterOptions: { ...action.filterOptions } };
    case "RESET_FILTER_OPTIONS":
      return { ...state, filterOptions: {} };
    case "SHOW_NO_PRODUCTS_IN_CURRENT_FILTER":
        return { ...state, showNoProducts: true };
    case "HIDE_NO_PRODUCTS_IN_CURRENT_FILTER":
        return { ...state, showNoProducts: false };
    default:
      return state;
  }
}
