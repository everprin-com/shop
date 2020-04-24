import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles";
import { isEqualArr } from "../Utils";

const mapStateToProps = state => {
  return {
    products: state.product,
    card: state.card,
    loading: state.general.loading,
    firstEnter: state.general.firstEnter,
    showNoProducts: state.filterData.showNoProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestAndAddProducts: params =>
      dispatch({ type: "REQUEST_AND_ADD_PRODUCTS", params }),
    handlePagination: () => dispatch({ type: "HANDLE_PAGINATION" }),
    resetProducts: () => dispatch({ type: "RESET_PRODUCTS" }),
    resetFilter: () =>
      dispatch({ type: "RESET_FILTER_WITHOUT_SEX_AND_REQUEST" })
    // fistEnterOff: () => dispatch({ type: "FIRST_ENTER_OFF" })
  };
};

class ProductList extends React.PureComponent {
  state = { scroll: 0 };

  componentDidMount() {
    const {
      requestAndAddProducts,
      products,
      productsParams,
      resetProducts
    } = this.props;
    if (productsParams && productsParams.search_category) {
      requestAndAddProducts(productsParams);
    }
    window.addEventListener("scroll", this.scrollChange);
    resetProducts();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollChange);
  }

  componentDidUpdate(prevProps) {
    const { resetFilter, productsParams, requestAndAddProducts } = this.props;
    if (
      (prevProps.productsParams &&
        prevProps.productsParams.search_category !=
          productsParams.search_category) ||
      (productsParams.sex &&
        prevProps.productsParams.sex &&
        !isEqualArr(productsParams.sex, prevProps.productsParams.sex))
    ) {
      resetFilter();
      requestAndAddProducts(productsParams);
    }
  }

  getElemntsHeight = () => {
    const heightProductList = document.getElementsByClassName("productList")[0]
      ? document.getElementsByClassName("productList")[0].offsetHeight
      : 0;
    const heightHeader = document.getElementsByClassName("header")[0]
      ? document.getElementsByClassName("header")[0].offsetHeight
      : 0;
    return heightProductList + heightHeader;
  };

  scrollChange = () => {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const positioBbuttomDisplay = scrolled + window.innerHeight;
    const isAchiveBottom = this.getElemntsHeight() - positioBbuttomDisplay < 50;
    if (isAchiveBottom && !this.props.loading) {
      this.props.handlePagination();
    }
  };

  renderProductList(windowWidthLess1000) {
    const { products, card, productIdExclud } = this.props;
    return products
      .filter(p => p.id != productIdExclud)
      .map((product, _i) => {
        const inCard =
          card.data && card.data.some(cardItem => cardItem.id == product.id);
        return (
          <ProductItem
            data={product}
            windowWidthLess1000={windowWidthLess1000}
            inCard={inCard}
            key={_i}
          />
        );
      });
  }

  render() {
    const { classes, loading, forCart, title, showNoProducts } = this.props;
    const windowWidthLess1000 = window.innerWidth < 1000;
    return (
      <div className={classes.wraper}>
        {title && <div className={classes.title}>{title}</div>}
        <div
          className={`${forCart ? classes.rootCart : classes.root} productList`}
        >
          {showNoProducts ? (
            <div className="no-products-block worning">
              <div className="no-products-block__title">
                К сожалению по текущим настройкам фильтра товаров нет((
              </div>
              <div className="no-products-block__recommendation">
                Вы можете выбрать <strong>другие настройки фильтра</strong> или{" "}
                <strong>очистить фильтр/ы</strong>
              </div>
            </div>
          ) : null}
          {this.renderProductList(windowWidthLess1000)}
        </div>
        {loading && (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductList));
