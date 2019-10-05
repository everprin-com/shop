export default function(
  state = {
    firstEnter: true,
    lastRequestParams: { sex: ["wooman"] },
    mobileSideBar: false,
    tableSize: false,
  },
  action
) {
  switch (action.type) {
    case "CHANGE_LAST_PARAMS":
      return { ...state, lastRequestParams: action.lastRequestParams };
    case "RESET_LAST_PARAMS":
      return {};
    case "LOADING_ON":
      return { ...state, loading: true };
    case "LOADING_OFF":
      return { ...state, loading: false };
    case "SCROLL_ON":
      return { ...state, scrolling: true };
    case "SCROLL_OFF":
      return { ...state, scrolling: false };
    case "CHANGE_LAST_PAGE":
      return { ...state, lastPage: action.page };
    case "DELETE_LAST_PAGE":
      return { ...state, lastPage: null };
    case "FIRST_ENTER_ON":
      return { ...state, firstEnter: true };
    case "FIRST_ENTER_OFF":
      return { ...state, firstEnter: false };
    case "ADD_CURRENT_PRODUCT":
      return { ...state, currentProduct: action.product };
    case "DELETE_CURRENT_PRODUCT":
      return { ...state, currentProduct: null };
    case "MOBILE_SIDEBAR_OFF":
      return { ...state, mobileSideBar: false };
    case "MOBILE_SIDEBAR_ON":
      return { ...state, mobileSideBar: true };
    case "TABLE_SIZE_OFF":
      return { ...state, tableSize: false };
    case "TABLE_SIZE_ON":
      return { ...state, tableSize: true };
    case "SET_PAGE_WIDTH":
      return { ...state, pageWidth: action.pageWidth };
    default:
      return state;
  }
}
