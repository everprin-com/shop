import React from "react";
import ProductList from "./ProductList";
import SideBar from "./SideBar";
import { withStyles } from "@material-ui/core/styles";
import Slider from "./Slider";
import imgCategoryMap from "./constants/imgCategoryMap";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    sliderProducts: state.product
  };
};

const mapDispatchToProps = dispatch => {
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
    height: 280,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
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
  sliderContent: {
    textAlign: "center"
  },
  title: {
    fontSize: 20
  }
});

function CategoryItem({ title, src, classes, click }) {
  return (
    <div className={classes.sliderItem} onClick={() =>  click({search_category: title})}>
      <div className={classes.sliderContent}>
        <div className={classes.imgWrap}>
          <img className={classes.img} src={src} />
        </div>
        <div className={classes.title}>{title}</div>
      </div>
    </div>
  );
}

class Home extends React.PureComponent {
  render() {
    const { classes, requestAndAddProducts } = this.props;
    const products = Object.entries(imgCategoryMap).map(o => {
      return (
        <CategoryItem
          title={o[0]}
          // src={o[1]}
          src={"https://vsestilno.com.ua/modules/catalog_items/uploads/original/5560_768837edf4641f2.jpg"}
          click={requestAndAddProducts}
          classes={classes}
        />
      );
    });
    return (
      <div className={classes.root}>
        <SideBar isMainSideBar />
        <div className={classes.main}>
          <div className={`${classes.slider} horizontal-slider`}>
            <Slider
              // title="Вы просматривали:"
              simple
              slidesToShow={4}
              slidesToScroll={1}
              products={products}
              draggable
              arrows
              dots={false}
            />
          </div>
          <ProductList productsParams={{ shuffled_products: true }} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
