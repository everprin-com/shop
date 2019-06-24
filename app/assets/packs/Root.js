// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
// add raect  https://cognitiveclass.ai/blog/react-on-rails-tutorial-integrating-react-and-ruby-on-rails/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reducers from "../javascript/reducers"
import App from "../javascript/components/App"
import fetchGet from "../javascript/components/api/fetchGet"
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import ProductCart from "../javascript/components/ProductCart"
import OrderForm from "../javascript/components/OrderForm"
import ConvertXml from "../javascript/components/ConvertXml"
import RegistrationForm from "../javascript/components/RegistrationForm"
import rootSaga from '../javascript/components/saga'
import ScrollToTopRoute from "../javascript/components/ScrollToTopRoute"
import Loadable from 'react-loadable';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

window.store = store

const Loading = () => <div>Loading...</div>;

const DApp = Loadable({
  loader: () => import('../javascript/components/App'),
  loading: Loading
});

const DProductCart = Loadable({
  loader: () => import('../javascript/components/ProductCart'),
  loading: Loading
});

(() => {
  fetchGet("/meta_datas")
  .then(meta_datas => {
    store.dispatch({ type: 'ADD_META_DATAS', meta_datas })
  })
})()

const DOrderForm = Loadable({
  loader: () => import('../javascript/components/OrderForm'),
  loading: Loading
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <ScrollToTopRoute exact path="/" component={App} />
          <ScrollToTopRoute path="/productcart/:id" component={ProductCart} />
          <ScrollToTopRoute path="/orderform/" component={OrderForm} />
          <Route path="/registration/" component={RegistrationForm} />
          <Route path="/convertXml/" component={ConvertXml} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
  )
})

// Usage in App.jsx
{/* <Router history={History}>
  <Switch>
    <ScrollToTopRoute exact path="/" component={Home}/>
    <ScrollToTopRoute exact path="/about" component={About}/>
    <ScrollToTopRoute exact path="/search" component={Search}/>
    <ScrollToTopRoute exact component={NoMatch}/>
  </Switch>
</Router> */}
