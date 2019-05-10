// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
// add raect  https://cognitiveclass.ai/blog/react-on-rails-tutorial-integrating-react-and-ruby-on-rails/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reducers from "../javascript/reducers"
import App from "../javascript/components/App"
import {  products } from '../javascript/components/mockData'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import ProductCart from "../javascript/components/ProductCart"
import OrderForm from "../javascript/components/OrderForm"
import rootSaga from '../javascript/components/saga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

window.store = store
window.products = products

store.subscribe(()=>console.log(store.getState()))

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={App} />
        <Route path="/productcart/:id" component={ProductCart} />
        <Route path="/orderform/" component={OrderForm} />
      </Router>
    </Provider>,  
    document.getElementById("root")
  )
})
