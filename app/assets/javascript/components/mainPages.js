
import React from "react";
import Loadable from "react-loadable";

const Loading = () => <div>Loading...</div>;

const DApp = Loadable({
  loader: () => import("./App/App"),
  loading: Loading
});

const DProductCart = Loadable({
  loader: () => import("./ProductCart/ProductCart"),
  loading: Loading
});

const DOrderForm = Loadable({
  loader: () => import("./OrderForm/OrderForm"),
  loading: Loading
});

const DRegistrationForm = Loadable({
  loader: () => import("./RegistrationForm/RegistrationForm"),
  loading: Loading
});

const DConvertXml = Loadable({
  loader: () => import("./ConvertXml/ConvertXml"),
  loading: Loading
});

export {
    DApp,
    DProductCart,
    DOrderForm,
    DRegistrationForm,
    DConvertXml,
}