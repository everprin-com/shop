const initialCard = JSON.parse(localStorage.getItem("card")) || {
  data: [],
  isOpen: false,
  withProduct: false
};

export default function(state = initialCard, action) {
  switch (action.type) {
    case "PUT_TO_CART":
      let productWithSameActiveSize = state.data.find(product => {
        return (
          product.id === action.product.id &&
          product.activeSize == action.product.activeSize
        );
      });
      console.log(productWithSameActiveSize)
      const product = productWithSameActiveSize
        ? productWithSameActiveSize
        : state.data.find(product => product.id === action.product.id) || {};
      console.log(product)
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
    case "RESET_CART":
      return { ...state, data: [], withProduct: false };
    case "OPEN_CART":
      return { ...state, isOpen: true, withProduct: action.withProduct };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "SET_AMOUTN":
      let { data } = state;
      const findedProduct =
        data.find(product => product.id === action.id) || {};
      const productIndex = data.indexOf(findedProduct);
      data[productIndex] = { ...findedProduct, amount: action.amount };
      return { ...state, data };
    default:
      return state;
  }
}
