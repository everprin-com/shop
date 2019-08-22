export default function(
  state = {
    size: { status: false, id: null },
    successOrder: { status: false },
    slider: { status: false }
  },
  action
) {
  switch (action.type) {
    case "SHOW_SET_SIZE_WINDOW":
      return {
        size: { id: action.id, status: true },
        successOrder: { ...state.successOrder },
        slider: { status: false }
      };
    case "CLOSE_SET_SIZE_WINDOW":
      return {
        size: { id: null, status: false },
        successOrder: { ...state.successOrder },
        slider: { status: false }
      };
    case "SHOW_SUCCESS_WINDOW":
      return {
        size: { ...state.size },
        successOrder: { status: true },
        slider: { status: false }
      };
    case "CLOSE_SUCCESS_WINDOW":
      return {
        size: { ...state.size },
        successOrder: { status: false },
        slider: { status: false }
      };
    case "SHOW_SLIDER_WINDOW":
      return { ...state, slider: { status: true } };
    case "CLOSE_SLIDER_WINDOW":
      return { ...state, slider: { status: false } };
    case "SHOW_DELIVERY_WINDOW":
      return { ...state, delivery: { status: true } };
    case "CLOSE_DELIVERY_WINDOW":
      return { ...state, delivery: { status: false } };
    case "SHOW_PAYMENT_WINDOW":
      return { ...state, payment: { status: true } };
    case "CLOSE_PAYMENT_WINDOW":
      return { ...state, payment: { status: false } };
    case "SHOW_RETURN_WINDOW":
      return { ...state, return: { status: true } };
    case "CLOSE_RETURN_WINDOW":
      return { ...state, return: { status: false } };
    default:
      return state;
  }
}
