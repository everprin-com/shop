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
    firstEnter: state.general.firstEnter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestAndAddProducts: params =>
      dispatch({ type: "REQUEST_AND_ADD_PRODUCTS", params }),
    handlePagination: () => dispatch({ type: "HANDLE_PAGINATION" })
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
      firstEnter
    } = this.props;
    if (productsParams && productsParams.search_category) {
      requestAndAddProducts(productsParams);
    }
    window.addEventListener("scroll", this.scrollChange);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollChange);
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.productsParams &&
        prevProps.productsParams.search_category !=
          this.props.productsParams.search_category) ||
      (this.props.productsParams.sex &&
        prevProps.productsParams.sex &&
        !isEqualArr(
          this.props.productsParams.sex,
          prevProps.productsParams.sex
        ))
    ) {
      this.props.requestAndAddProducts(this.props.productsParams);
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
    const { classes, loading, forCart, title } = this.props;
    const windowWidthLess1000 = window.innerWidth < 1000;
    return (
      <div className={classes.wraper}>
        {title && <div className={classes.title}>{title}</div>}
        <div
          className={`${forCart ? classes.rootCart : classes.root} productList`}
        >
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
