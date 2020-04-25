// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
// add raect  https://cognitiveclass.ai/blog/react-on-rails-tutorial-integrating-react-and-ruby-on-rails/

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import fetchGet from "../javascript/components/api/fetchGet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "../javascript/store";
import ScrollToTopRoute from "../javascript/components/ScrollToTopRoute/ScrollToTopRoute";
import { setPageWidth } from "../javascript/components/Utils";
import {
  DApp,
  DProductCart,
  DOrderForm,
  DRegistrationForm,
  DConvertXml,
  DCategoryPage,
  DTest
} from "../javascript/components/mainPages";
import "../components";

window.store = store;

setPageWidth(store);
try {
  window.addEventListener("resize", () => setPageWidth(store));
} catch (e) {
  window.onload("resize", () => setPageWidth(store));
}

// const setExitPopup = () => store.dispatch({ type: "SHOW_EXIT_WINDOW" })

(() => {
  fetchGet("/meta_datas").then(meta_data => {
    store.dispatch({ type: "ADD_META_DATA", meta_data });
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(
    () =>
      document
        .getElementById("exit-line")
        .addEventListener(
          "mouseleave",
          () => store.dispatch({ type: "SHOW_EXIT_WINDOW" }),
          { once: true }
        ),
    40000
  );

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <ScrollToTopRoute exact path="/" component={DApp} />
          <ScrollToTopRoute path="/productcart/:id" component={DProductCart} />
          <ScrollToTopRoute path="/orderform/" component={DOrderForm} />
          <ScrollToTopRoute
            path="/categoryPage/:category"
            component={DCategoryPage}
          />
          <Route path="/registration/" component={DRegistrationForm} />
          <Route path="/convertXml/" component={DConvertXml} />
          <Route path="/test/" component={DTest} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
});
