import { call, put, takeEvery, takeLatest, select, all } from 'redux-saga/effects'
import regeneratorRuntime from "regenerator-runtime";
import fetchGetWithParams from "./api/fetchGetWithParams"
// import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* openCart(action) {
   try {
    yield put({type: 'OPEN_CART', withProduct: true})
   } catch (e) {
      console.log('err')
   }
}

function* checkSetSize(action){
  if (action.product.size ? !action.product.size.includes("универсальный") : false) { 
    yield put({type: 'SHOW_SET_SIZE_WINDOW', id: action.product.id})
  } else {
    yield put({type: 'PUT_TO_CART', product: action.product})
  } 
}

function* getFilteredProducts(action) {
  try {
     const state = yield select();
     const products = yield call(fetchGetWithParams, "items/", {...state.filter}, true)
     yield put({type: "RESET_AND_ADD_PRODUCTS", products})
  } catch (error) {
     yield put({type: "FETCH_FAILED", error})
  }
}

function* watchTryPutCart() {
  yield takeEvery("TRY_PUT_TO_CART", checkSetSize );
}

function* watchPutToCart() {
  yield takeEvery("PUT_TO_CART", openCart);
}

function* watchAddFilter() {
  yield takeEvery("ADD_FILTER", getFilteredProducts);
}

export default function* rootSaga() {
  yield all([
    watchTryPutCart(),
    watchPutToCart(),
    watchAddFilter(),
  ])
}
