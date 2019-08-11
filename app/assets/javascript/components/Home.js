import React from "react";
import ProductList from "./ProductList";
import SideBar from "./SideBar";
import { withStyles } from "@material-ui/core/styles";
import Slider from "./Slider";
import imgCategoryMap from "./constants/imgCategoryMap";
import { connect } from "react-redux";
import fetchGetWithParams from "./api/fetchGetWithParams";
import { convertPrice } from "./Utils";
import { Link } from "react-router-dom";

const mapStateToProps = state => {
  return {
    sliderProducts: state.product,
    firstEnter: state.general.firstEnter
  };
};

const mapDispatchToProps = dispatch => {
  window.dispatch = dispatch;
  return {
    requestAndAddProducts: params =>
      dispatch({ type: "REQUEST_AND_ADD_PRODUCTS", params, afterReset: true })
  };
};

const styles = theme => ({
  root: {
    display: "flex",
    marginTop: "60px"
  },
  slider: {
    marginLeft: 260,
    padding: 10,
    width: "calc(100% - 240px)",
    height: 305,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0
    }
  },
  main: {
    width: "100%",
    paddingTop: 103
  },
  sliderItem: {
    height: 250,
    cursor: "pointer"
  },
  img: {
    height: "100%",
    margin: "0 auto",
    borderRadius: "50%"
  },
  recImg: {
    height: "100%",
    margin: "0 auto",
    objectFit: "contain",
    maxWidth: "100%"
  },
  recImgWrap: {
    padding: "0 10px"
  },
  sliderContent: {
    textAlign: "center"
  },
  title: {
    fontSize: 20
  },
  recSlider: {
    height: 340,
    marginTop: 50
  },
  recTitle: {
    color: "#333",
    fontSize: "14px",
    fontWeight: "bold"
  },
  recCategory: {
    color: "#888",
    fontSize: "14px",
    margin: "0 auto 5px"
  },
  price: {
    display: "flex",
    justifyContent: "center"
  },
  oldPrice: {
    color: "#a6a5a5",
    fontSize: "14px",
    textDecoration: "line-through",
    paddingBottom: "5px"
  },
  newPrice: {
    color: "f74137",
    fontSize: "17px",
    marginLeft: 15
  },
  linkToProductCart: {
    textDecoration: "none"
  }
});

function CategoryItem({ title, src, classes, click }) {
  return (
    <div
      className={classes.sliderItem}
      onClick={() => click({ search_category: title })}
    >
      <div className={classes.sliderContent}>
        <div className={classes.imgWrap}>
          <img className={classes.img} src={src} />
        </div>
        <div className={classes.title}>{title}</div>
      </div>
    </div>
  );
}

function RecomendedProductsItem({
  title,
  src,
  classes,
  click,
  category,
  price,
  id
}) {
  const { price: newPrice, oldPrice, saleShow } = convertPrice(price);
  return (
    <Link to={`/productcart/${id}`} className={classes.linkToProductCart}>
      <div className={classes.sliderItem}>
        <div className={classes.sliderContent}>
          <div className={classes.recImgWrap}>
            <img className={classes.recImg} src={src} />
          </div>
          <div className={classes.recTitle}>{title}</div>
          <div className={classes.recCategory}>{category}</div>
          <div className={classes.price}>
            <div className={classes.oldPrice}>{`${oldPrice} грн`}</div>
            <div className={classes.newPrice}>{`${newPrice} грн`}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

class Home extends React.PureComponent {
  state = { data: [] };
  recomendedProducts = () => {
    fetchGetWithParams("/items/", {
      shuffled_products: true,
      per_page: 8
    }).then(data => this.setState({ data: data.items }));
  };

  componentDidMount() {
    this.recomendedProducts();
  }

  render() {
    const { classes, requestAndAddProducts, firstEnter } = this.props;
    const products = Object.entries(imgCategoryMap).map(o => {
      return (
        <CategoryItem
          title={o[0]}
          src={o[1]}
          click={requestAndAddProducts}
          classes={classes}
        />
      );
    });
    const recomendedProducts = this.state.data.map(product => {
      return (
        <RecomendedProductsItem
          title={product.name}
          src={
            Array.isArray(product.picture)
              ? product.picture[0]
              : product.picture
          }
          // click={requestAndAddProducts}
          classes={classes}
          category={product.category}
          price={product.price}
          id={product.id}
        />
      );
    });
    return (
      <div className={classes.root}>
        <SideBar isMainSideBar />
        <div className={classes.main}>
          <Slider
            simple
            slidesToShow={4}
            slidesToScroll={1}
            products={products}
            draggable
            arrows
            dots={false}
            mainPage
            firstEnter={firstEnter}
            className={`${classes.slider} horizontal-slider main-page-slider`}
          />

          <Slider
            title="Рекомендуемые товары"
            simple
            slidesToShow={4}
            slidesToScroll={1}
            products={recomendedProducts}
            draggable
            arrows
            dots={false}
            mainPage
            firstEnter={firstEnter}
            className={`${classes.slider} ${
              classes.recSlider
            } horizontal-slider main-page-slider`}
          />
          <ProductList
            productsParams={{ shuffled_products: true, per_page: 12 }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
