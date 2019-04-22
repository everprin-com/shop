// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
// add raect  https://cognitiveclass.ai/blog/react-on-rails-tutorial-integrating-react-and-ruby-on-rails/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reducers from "../reducers"
import App from "../components/App"
import {  products } from '../components/mockData'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import ProductCart from "../components/ProductCart"
import mySaga from '../components/saga'

const ProductCartWrap = ({match}) => <ProductCart id={match.params.id} />

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
  
const initialStore = {
  user: {
    age:30 ,
    name: "Vasy",
    login: "Pupkin",
    role: "Bot"
  },
  card: [
    { product_id: 1, title: "pansil", describtion: "some describtion of pensil",   price: 20, amount: 2 },
    { product_id: 2, title: "pen", describtion: "some describtion of pen",   price: 10, amount: 4 },
    { product_id: 3, title: "rule", describtion: "some describtion of rule",   price: 300, amount: 5 },
    { product_id: 4, title: "table", describtion: "some describtion of table",   price: 140, amount: 3 },
  ]
}

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mySaga)


window.store = store
window.products = products

store.dispatch({type:"ADD_PRODUCTS", products})

store.subscribe(()=>console.log(store.getState()))

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={App} />
        <Route path="/productcart/:id" component={ProductCartWrap} />
      </Router>
    </Provider>,  
    document.getElementById("root")
  )
})
