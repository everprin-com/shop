import React from "react";
import ProductList from "../ProductList/ProductList";
import SideBar from "../SideBar/SideBar";
import { withStyles } from "@material-ui/core/styles";
import Slider from "../Slider/Slider";
import SideBarPanel from "../SideBar/SideBarPanel";
import imgCategoryMap from "../constants/categoriesMap";
import { connect } from "react-redux";
import fetchGetWithParams from "../api/fetchGetWithParams";
import { convertPrice, textWithDots, isEqualArr } from "../Utils";
import { Link } from "react-router-dom";
import styles from "./styles";
import KiloLoading from "../KiloLoading"

const mapStateToProps = state => {
  const isFemale =
    state.filterData.filter.sex &&
    state.filterData.filter.sex.includes("wooman");
  return {
    sex: isFemale ? "female" : "male",
    sliderProducts: state.product,
    firstEnter: state.general.firstEnter,
    pageWidth: state.general.pageWidth,
    sexArr: state.filterData.filter.sex,
  };
};

const mapDispatchToProps = dispatch => {
  window.dispatch = dispatch;
  return {
    requestAndAddProducts: params =>
      dispatch({ type: "REQUEST_AND_ADD_PRODUCTS", params, afterReset: true })
  };
};

function CategoryItem({ title, src, classes, click }) {
  return (
    <div className={classes.sliderItem}>
      <Link to={`/categoryPage/${title}`} className={classes.linkToProductCart}>
        <div className={classes.sliderContent}>
          <div className={classes.imgWrap}>
            <img className={classes.img} src={src} />
          </div>
          <div className={classes.title}>{title}</div>
        </div>
      </Link>
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
          <div className={classes.recTitle}>{textWithDots(title, 40)}</div>
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
      per_page: 8,
      sex: this.props.sexArr,
    }).then(data => this.setState({ data: data.items }));
  };

  componentDidMount() {
    this.recomendedProducts();
  }

  componentDidUpdate(prevProps){
   if (!isEqualArr(prevProps.sexArr, this.props.sexArr)){
    this.recomendedProducts();
   }
  }

  render() {
    const {
      classes,
      requestAndAddProducts,
      firstEnter,
      sex,
      pageWidth,
      mainPage
    } = this.props;
    const products = Object.entries(imgCategoryMap[sex]).map(o => {
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
        {/* <KiloLoading /> */}
        <SideBar isMainSideBar showSideBarPanel />
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
            autoplay
            autoplaySpeed={4000}
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
            className={`${classes.slider} ${classes.recSlider} horizontal-slider main-page-slider`}
          />
          {/* <ProductList
            productsParams={{
              shuffled_products: true,
              per_page: pageWidth < 600 ? 3 : 10,
              sex: ["wooman"]
            }}
          /> */}
          <div className={classes.description}>
            <h1 className={classes.descriptionTitle}>
              ИНТЕРНЕТ МАГАЗИН ОДЕЖДЫ И ОБУВИ
            </h1>
            <p className={classes.descriptionP}>
              kilo.com.ua - это не просто интернет магазин одежды, это помощник
              для всей семьи.
            </p>
            <p className={classes.descriptionP}>
              Ведь вам не придется часами блуждать по торговым центрам в поиске
              нужных обновок. Все топовые бренды представлены у нас на сайте.
              Купить одежду онлайн сейчас настолько просто, что интернет шопинг
              покажется вам сплошным удовольствием.
            </p>
            <p className={classes.descriptionP}>
              На kilo.com.ua можно найти одежду, обувь и аксессуары как для
              женщин, так и для мужчин.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
