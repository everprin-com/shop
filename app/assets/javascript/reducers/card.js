export default function(
  state = { data: [], isOpen: false, withProduct: false },
  action
) {
  switch (action.type) {
    case "PUT_TO_CART":
      let productWithSameActiveSize = state.data.find(product => {
        return (
          product.id === action.product.id &&
          product.activeSize == action.product.activeSize
        );
      });
      const product = productWithSameActiveSize
        ? productWithSameActiveSize
        : state.data.find(product => product.id === action.product.id) || {};
      let prevAmount = product.amount;
      const isSizeEquel = product.activeSize == action.product.activeSize;

      if (prevAmount && isSizeEquel) {
        const witoutProduct = {
          ...state,
          data: [
            ...state.data.filter(product => {
              return (
                product.id === action.product.id &&
                product.activeSize != action.product.activeSize
              );
            })
          ]
        };
        console.log(witoutProduct);
        return {
          ...witoutProduct,
          data: [
            ...witoutProduct.data,
            {
              ...action.product,
              activeSize: product.activeSize,
              amount: ++prevAmount
            }
          ]
        };
      }
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...action.product,
            amount: 1,
            activeSize: [action.product.activeSize]
          }
        ]
      };
    case "DELETE_FROM_CART":
      return {
        ...state,
        data: [...state.data.filter(product => product.id !== action.id)]
      };
    case "OPEN_CART":
      return { ...state, isOpen: true, withProduct: action.withProduct };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "SET_AMOUTN":
      const findedProduct =
        state.data.find(product => product.id === action.id) || {};
      const witoutProduct = {
        ...state,
        data: [...state.data.filter(product => product.id !== action.id)]
      };
      return {
        ...witoutProduct,
        data: [
          ...witoutProduct.data,
          { ...findedProduct, amount: action.amount }
        ]
      };
    default:
      return state;
  }
}
