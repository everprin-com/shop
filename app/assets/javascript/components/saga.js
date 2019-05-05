import { call, put, takeEvery, takeLatest, select, all } from 'redux-saga/effects'
import regeneratorRuntime from "regenerator-runtime";
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
  if (!action.product.activeSize) { 
    yield put({type: 'SHOW_SET_SIZE_WINDOW', id: action.product.id})
  } else {
    yield put({type: 'PUT_TO_CART', product: action.product})
  } 
}

function* watchTryPutCart() {
  yield takeEvery("TRY_PUT_TO_CART", checkSetSize );
}

function* watchPutToCart() {
  yield takeEvery("PUT_TO_CART", openCart);
}

export default function* rootSaga() {
  yield all([
    watchTryPutCart(),
    watchPutToCart()
  ])
}
