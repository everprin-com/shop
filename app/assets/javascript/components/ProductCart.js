import React, { Component } from "react";
import ReactImageMagnify from "react-image-magnify";
import Header from "./Header";
import AboutProduct from "./AboutProduct";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import ProductItemSizes from "./ProductItemSizes";
import DialogWindow from "./Dialog";
import ChooseSize from "./ChooseSize";
import Footer from "./Footer";
import fetchGet from "./api/fetchGet";
import { getSizes } from "./Utils";
import Slider from "./Slider";
import { withRouter } from "react-router-dom";
import ProductList from "./ProductList";
// import ReactSlick from 'react-slick';
import ReactSlick from "./ReactSlick"
import Breadcrumbs from "./Breadcrumbs"

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


const mapStateToProps = state => {
  return {
    products: state.product,
    card: state.card,
    orderform: state.orderform,
    sliderProducts: state.slider.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCart: () => dispatch({ type: "OPEN_CART" }),
    putToCart: product => dispatch({ type: "TRY_PUT_TO_CART", product }),
    requestAndAddSlider: category =>
      dispatch({ type: "REQUEST_AND_ADD_PRODUCTS_TO_SLIDER", category }),
    addProduct: product => dispatch({ type: "ADD_PRODUCT", product })
  };
};

const styles = theme => ({
  root: {
    margin: "0 auto",
    display: "flex",
    fontFamily: "Arial",
    flexDirection: "column",
    lineHeight: "1.3",
    fontSize: "16px",
    minHeight: "100vh",
    justifyContent: "space-between",
    [theme.breakpoints.up("xs")]: {
      maxWidth: "320px"
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "600px"
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "1000px"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1200px"
    }
  },
  price: {
    color: "#000",
    fontSize: 24,
    lineHeight: "32px"
  },
  button: {
    fontSize: 16
  },
  mainContent: {
    display: "flex",
    flexDirection: "column"
  },
  mainContentInner: {
    display: "flex",
    [theme.breakpoints.between("xs", "xs")]: {
      flexDirection: "column"
    }
  },
  slider: {
    width: "100%"
  },
  img: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 150
    },
    [theme.breakpoints.between("xs", "xs")]: {
      flexDirection: "column"
    }
  },
  textContent: {
    marginTop: 150,
    marginLeft: 20,
    [theme.breakpoints.down("xs")]: {
      marginTop: 0
    }
  }
});

class ProductCart extends React.PureComponent {
  state = {};

  componentDidMount() {
    this.getProduct();
    this.scrollToTop();
  }

  componentDidUpdate(prevProps) {
    this.props.orderform && this.redirectToOrderForm();
    if (prevProps.location.pathname != this.props.location.pathname) {
      this.scrollToTop();
      this.getProduct();
    }
  }

  getProduct = () => {
    const { id } = this.props.match.params;
    fetchGet(`/items/${id}`).then(data => {
      this.setState({ data }, () => {
        this.props.requestAndAddSlider(this.state.data.category);
        this.props.addProduct(data);
      });
    });
  };

  scrollToTop = () => window.scroll({ top: 0, behavior: "smooth" });

  putToCart = () => {
    const { products, putToCart, match } = this.props;
    const product = products.find(product => product.id == match.params.id);
    putToCart(product);
  };

  redirectToOrderForm = () => this.props.history.push("/orderform");

  redirectToRoot = () => this.props.history.push("/");

  render() {
    const {
      classes,
      card,
      match,
      location,
      openCart,
      sliderProducts,
      products
    } = this.props;
    const { id } = match.params;
    const productData = products.find(product => product.id == id) || {};
    const { size, picture, category } = productData;
    const activeSize = productData.activeSize;
    const isInCart = card.data.some(cardItem => cardItem.id == id);
    return (
      <div className={classes.root}>
        <Header redirectToRoot={this.redirectToRoot} />
        {/* <External /> */}
        <Breadcrumbs
          links={[
            {href: "/", title: "Главная"},
            {href: "/orderform", title: "Форма заказа"}
          ]}
        />
        <div className={classes.mainContent}>
          <div className={classes.mainContentInner}>
            <div className={`${classes.img} fluid__image-container`}>
            {/* <ReactSlick /> */}
               <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: picture
                    },
                    largeImage: {
                      src: picture,
                      width: 1200,
                      height: 1800
                    },
                    // enlargedImagePortalId: 'portal',
                    enlargedImageContainerDimensions: {
                        width: '200%',
                        height: '100%'
                    }
                  }}
                />
            {/* <Slider
            title="Вы просматривали:"
            slidesToShow={1}
            slidesToScroll={1}
            simple
            products={
              [
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: picture
                    },
                    largeImage: {
                      src: picture,
                      width: 1200,
                      height: 1800
                    }
                  }}
                />,
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: picture
                    },
                    largeImage: {
                      src: picture,
                      width: 1200,
                      height: 1800
                    }
                  }}
                />
            ] 
            }
            draggable
            arrows
          /> */}
 
              {/* </ReactSlick> */}
            </div>

            <div className={`${classes.textContent} fluid__instructions`}>
              <h3>{productData.name}</h3>
              <p className={classes.price}>{`${Math.round(productData.price)} грн`}</p>
              <p>
                <ProductItemSizes
                  sizes={size}
                  id={+this.props.match.params.id}
                  activeSize={activeSize}
                  format="big"
                />
              </p>
              <p>
                <a href="#"> Таблица размеров</a>
              </p>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={isInCart ? openCart : this.putToCart}
              >
                {isInCart ? "Товар уже в корзине" : "Добавить в корзину"}
              </Button>
              <AboutProduct productData={productData} />
            </div>
          </div>
          <AboutProduct productData={productData} forMobile />
        </div>

        <div className={classes.slider}>
          <Slider
            title="Вы просматривали:"
            slidesToShow={4}
            slidesToScroll={4}
            products={sliderProducts}
            draggable
            arrows
          />
        </div>
        <ProductList forCart productsParams={{ search_category: category }} />
        <Footer />
        <DialogWindow
          title="Выберите размер"
          Component={ChooseSize}
          type="size"
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductCart));
