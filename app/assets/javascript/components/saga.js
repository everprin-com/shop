import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  all,
} from "redux-saga/effects";
import regeneratorRuntime from "regenerator-runtime";
import fetchGetWithParams from "./api/fetchGetWithParams";
// import Api from '...'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* openCart(action) {
  try {
    const state = yield select();
    yield put({ type: "OPEN_CART", withProduct: true });
    // need refactoring
    localStorage.setItem('card', JSON.stringify(state.card))
  } catch (e) {
    console.log("err");
  }
}

function* checkSetSize(action) {
  //checkProduct.activeSize ? action.product.size.includes("универсальный") : false
  const checkProduct = action.product;
  if (!checkProduct.activeSize && checkProduct.size.length > 0) {
    yield put({ type: "SHOW_SET_SIZE_WINDOW", id: action.product.id });
  } else {
    yield put({ type: "PUT_TO_CART", product: action.product });
  }
}

function* getFilteredProducts() {
  try {
    const state = yield select();
    yield put({ type: "SCROLL_ON" });
    if (Object.values(state.filterData.filter).flat(2).length > 0){
      yield put({ type: "FIRST_ENTER_OFF" });
    } else { yield put({ type: "FIRST_ENTER_ON" }); }
    
    const products = yield call(
      fetchGetWithParams,
      "/items/",
      {
        ...state.general.lastRequestParams,
        ...state.filterData.filter,
        page: 1
      },
      true
    );
    yield put({
      type: "CHANGE_LAST_PARAMS",
      lastRequestParams: {
        ...state.general.lastRequestParams,
        ...state.filterData.filter,
        page: 1
      }
    });
    yield put({ type: "RESET_AND_ADD_PRODUCTS", products: products.items });
    yield put({ type: "ADD_FILTER_OPTIONS", filterOptions: products.filters_options });
    yield put({ type: "MOBILE_SIDEBAR_OFF" });
  } catch (error) {
    yield put({ type: "FETCH_FAILED", error });
  }
}

function* requestAndAddProducts(action = {}, params = { page: 1 }) {
  let queryParams = { ...action.params, ...params };
  yield put({ type: "LOADING_ON" });
  const products = yield call(fetchGetWithParams, "/items/", queryParams);
  yield put({ type: "CHANGE_LAST_PAGE", page: products.total_pages });
  yield put({ type: "CHANGE_LAST_PARAMS", lastRequestParams: queryParams });
  if (action.afterReset) {
    yield put({ type: "RESET_AND_ADD_PRODUCTS", products: products.items });
    yield put({
      type: "ADD_FILTER_OPTIONS",
      filterOptions: products.filters_options
    });
  } else {
    yield put({ type: "ADD_PRODUCTS", products: products.items });
    yield put({
      type: "ADD_FILTER_OPTIONS",
      filterOptions: products.filters_options
    });
  }
  yield put({ type: "LOADING_OFF" });
}

function* handlePagination() {
  const state = yield select();
  const lastParams = state.general.lastRequestParams;
  if (lastParams.page >= state.general.lastPage) return;
  if (!lastParams) return;
  const params = { ...lastParams, page: ++lastParams.page };
  yield requestAndAddProducts({}, params);
}

function* requestAndAddProductsToSlider() {
  const products = yield call(fetchGetWithParams, "/items/", {
    price_search_from: 300,
    price_search_to: 400
  });
  yield put({ type: "ADD_PRODUCTS_TO_SLIDER", products: products.items });
}

function* handleCloseCart(action) {
  const state = yield select();
  const card = JSON.parse(localStorage.getItem('card'))
  const { data } = card
  const newData = data.filter(product=> product.id != action.id)
   localStorage.setItem('card', JSON.stringify({...card, data: newData}))
  if (state.card.data.length < 1) {
    yield put({ type: "CLOSE_CART" });
    localStorage.removeItem('card')
  }
}

function* handleScroll() {
    yield delay(6000)
    yield put({ type: "SCROLL_OFF" });
}

function* handleOpenCart() {
  const state = yield select();
  if (state.card.data.length < 1) return;
  yield put({ type: "OPEN_CART" });
}

function* handleResetCart() {
  localStorage.removeItem('card')
}

function* watchTryPutCart() {
  yield takeEvery("TRY_PUT_TO_CART", checkSetSize);
}

function* watchPutToCart() {
  yield takeEvery("PUT_TO_CART", openCart);
}

function* watchAddFilter() {
  yield takeEvery("ADD_FILTER", getFilteredProducts);
}

function* watchRequestAndAddProducts() {
  yield takeEvery("REQUEST_AND_ADD_PRODUCTS", requestAndAddProducts);
}

function* watchHandlePagination() {
  yield takeEvery("HANDLE_PAGINATION", handlePagination);
}

function* watchRequestAndAddProductsToSlider() {
  yield takeEvery(
    "REQUEST_AND_ADD_PRODUCTS_TO_SLIDER",
    requestAndAddProductsToSlider
  );
}

function* watchScroll() {
  yield takeEvery("SCROLL_ON", handleScroll);
}

function* watchOpenCart() {
  yield takeEvery("TRY_OPEN_CART", handleOpenCart);
}

function* watchDeleteFromCart() {
  yield takeEvery("DELETE_FROM_CART", handleCloseCart);
}

function* watchResetCart() {
  yield takeEvery("RESET_CART", handleResetCart);
}

export default function* rootSaga() {
  yield all([
    watchTryPutCart(),
    watchPutToCart(),
    watchAddFilter(),
    watchRequestAndAddProducts(),
    watchHandlePagination(),
    watchRequestAndAddProductsToSlider(),
    watchScroll(),
    watchOpenCart(),
    watchDeleteFromCart(),
    watchResetCart(),
  ]);
}
