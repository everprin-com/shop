// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
// add raect  https://cognitiveclass.ai/blog/react-on-rails-tutorial-integrating-react-and-ruby-on-rails/

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reducers from "../javascript/reducers";
// import App from "../javascript/components/App/App";
import fetchGet from "../javascript/components/api/fetchGet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
// import ProductCart from "../javascript/components/ProductCart/ProductCart";
// import OrderForm from "../javascript/components/OrderForm/OrderForm";
import ConvertXml from "../javascript/components/ConvertXml/ConvertXml";
// import RegistrationForm from "../javascript/components/RegistrationForm/RegistrationForm";
import rootSaga from "../javascript/components/saga";
import ScrollToTopRoute from "../javascript/components/ScrollToTopRoute/ScrollToTopRoute";
import Loadable from "react-loadable";
import '../components'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

window.store = store;

const Loading = () => <div>Loading...</div>;

const DApp = Loadable({
  loader: () => import("../javascript/components/App/App"),
  loading: Loading
});

const DProductCart = Loadable({
  loader: () => import("../javascript/components/ProductCart/ProductCart"),
  loading: Loading
});

const DOrderForm = Loadable({
  loader: () => import("../javascript/components/OrderForm/OrderForm"),
  loading: Loading
});

const DRegistrationForm = Loadable({
  loader: () => import("../javascript/components/RegistrationForm/RegistrationForm"),
  loading: Loading
});

const DConvertXml = Loadable({
  loader: () => import("../javascript/components/ConvertXml/ConvertXml"),
  loading: Loading
});

(() => {
  fetchGet("/meta_datas").then(meta_data => {
    store.dispatch({ type: "ADD_META_DATA", meta_data });
  });
})();


document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <ScrollToTopRoute exact path="/" component={DApp} />
          <ScrollToTopRoute path="/productcart/:id" component={DProductCart} />
          <ScrollToTopRoute path="/orderform/" component={DOrderForm} />
          <Route path="/registration/" component={DRegistrationForm} />
          <Route path="/convertXml/" component={DConvertXml} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
});
