
import React from "react";
import Loadable from "react-loadable";
import KiloLoading from "./KiloLoading"

const DApp = Loadable({
  loader: () => import("./App/App"),
  loading: KiloLoading
});

const DTest = Loadable({
  loader: () => import("./Test/Test"),
  loading: KiloLoading
});

const DProductCart = Loadable({
  loader: () => import("./ProductCart/ProductCart"),
  loading: KiloLoading
});

const DOrderForm = Loadable({
  loader: () => import("./OrderForm/OrderForm"),
  loading: KiloLoading
});

const DRegistrationForm = Loadable({
  loader: () => import("./RegistrationForm/RegistrationForm"),
  loading: KiloLoading
});

const DConvertXml = Loadable({
  loader: () => import("./ConvertXml/ConvertXml"),
  loading: KiloLoading
});

const DCategoryPage = Loadable({
  loader: () => import("./CategoryPage/CategoryPage"),
  loading: KiloLoading
});

export {
    DApp,
    DProductCart,
    DOrderForm,
    DRegistrationForm,
    DConvertXml,
    DCategoryPage,
    DTest,
}