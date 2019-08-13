import React from "react";
import ReactImageMagnify from "react-image-magnify";
import Header from "../Header/Header";
import AboutProduct from "../AboutProduct/AboutProduct";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import ProductItemSizes from "../ProductItemSizes/ProductItemSizes";
import DialogWindow from "../Dialog/Dialog";
import ChooseSize from "../ChooseSize/ChooseSize";
import Footer from "../Footer/Footer";
import fetchGet from "../api/fetchGet";
import Slider from "../Slider/Slider";
import ProductList from "../ProductList/ProductList";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import styles from "./styles";

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
    addProduct: product => dispatch({ type: "ADD_PRODUCT", product }),
    openGallery: () => dispatch({ type: "SHOW_SLIDER_WINDOW" })
  };
};

function SliderItem({ src, classes }) {
  return (
    <div className={classes.gelleryItemWrap}>
      <img src={src} className={classes.gelleryItem} />
    </div>
  );
}

function SliderS({ picture, classes }) {
  return (
    <div className={`${classes.img} fluid__image-container gallery`}>
      <Slider
        slidesToShow={1}
        slidesToScroll={1}
        simple
        products={
          Array.isArray(picture)
            ? picture.map(src => SliderItem({ src, classes }))
            : picture
        }
        draggable
        arrows
        effect="fade"
        vertical
        customPaging={function(i) {
          return (
            <a>
              <img src={picture[i]} />
            </a>
          );
        }}
        dots
        dotsClass={"slick-dots slick-thumb"}
      />
    </div>
  );
}

class ProductCart extends React.PureComponent {
  state = { data: {} };

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

  openGallery = e => {
    const windowWidth = window.innerWidth;
    if (
      e.target.nodeName == "svg" ||
      e.target.nodeName == "path" ||
      windowWidth < 1000
    )
      return;
    this.props.openGallery();
  };

  sliderItem = (srcPicture, alt) => {
    return (
      <ReactImageMagnify
        {...{
          smallImage: {
            alt,
            isFluidWidth: true,
            src: srcPicture
          },
          largeImage: {
            alt,
            src: srcPicture,
            width: 1200,
            height: 1800
          },
          enlargedImageContainerDimensions: {
            width: "200%",
            height: "100%"
          }
        }}
      />
    );
  };

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
    const { size, picture, name, category, price } = productData;
    const activeSize = productData.activeSize;
    const isInCart = card.data.some(cardItem => cardItem.id == id);
    return (
      <div className={`${classes.root} product-cart`}>
        <Header redirectToRoot={this.redirectToRoot} />
        <Breadcrumbs
          links={[
            { href: "/", title: "Главная" },
            { href: "/orderform", title: "Форма заказа" }
          ]}
          category={category}
          name={name}
          redirectToRoot={this.redirectToRoot}
        />
        <div className={classes.mainContent}>
          <div className={classes.mainContentInner}>
            <div
              className={`${classes.img} fluid__image-container product-show`}
              onClick={this.openGallery}
            >
              <Slider
                slidesToShow={1}
                slidesToScroll={1}
                simple
                products={
                  Array.isArray(picture)
                    ? picture.map(srcPicture => this.sliderItem(srcPicture))
                    : picture
                }
                draggable
                arrows
                effect="fade"
                vertical
              />
            </div>

            <div className={`${classes.textContent} fluid__instructions`}>
              <h3>{name}</h3>
              <p className={classes.price}>{`${Math.round(price)} грн`}</p>
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
                // onClick={isInCart ? openCart : this.putToCart}
                onClick={this.putToCart}
              >
                Купить
                {/* {isInCart ? "Товар уже в корзине" : "Добавить в корзину"} */}
              </Button>
              <AboutProduct productData={productData} />
            </div>
          </div>
          <AboutProduct productData={productData} forMobile />
        </div>

        {/* <div className={`${classes.slider} horizontal-slider`}>
          <Slider
            title="Вы просматривали:"
            slidesToShow={4}
            slidesToScroll={4}
            products={sliderProducts}
            draggable
            arrows
          />
        </div> */}
        <ProductList
          forCart
          productsParams={{ search_category: category }}
          title="С этим товаром смотрят"
        />
        <Footer />
        <DialogWindow
          title="Выберите размер"
          Component={ChooseSize}
          type="size"
        />
        <DialogWindow
          title="Галерея товара"
          Component={() => SliderS({ picture, classes })}
          type="slider"
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductCart));