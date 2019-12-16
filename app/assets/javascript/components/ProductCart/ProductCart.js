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
import SliderS from "../Slider/SliderS";
import TableSize from "../TableSize/TableSize";
import styles from "./styles";
import WidgetPanel from "../HelpWidget/WidgetPanel";
import KiloLoading from "../KiloLoading";
import TitleComponent from "../TitleComponent";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import fetchPost from "../api/fetchPost"

function WhriteReview({classes}) {
  const [text, setText] = React.useState("");
  const [author, setAuthor] = React.useState("");

  const handleChansetTextge = (event, newValue) => {
    console.log(event.target.value)
    setText(event.target.value);
  };
  return (
    <div>
      <TextareaAutosize
        value={text}
        aria-label="minimum height"
        rowsMin={3}
        placeholder="Minimum 3 rows"
        onChange={handleChansetTextge}
      />
      <Button
        variant="contained"
        color="primary"
        // className={classes.button}
        // onClick={isInCart ? openCart : this.putToCart}
        onClick={()=>fetchPost("/product_comments", JSON.stringify({text}))}
      >
        Оставить отзыв
        {/* {isInCart ? "Товар уже в корзине" : "Добавить в корзину"} */}
      </Button>
    </div>
  );
}

function Сharacteristic({ characteristicPorps }) {
  const {
    productData,
    classes,
    id,
    price,
    size,
    activeSize,
    data = {},
    openTableSize,
    putToCart
  } = characteristicPorps;

  return (
    <div>
      <p className={classes.price}>{`${Math.round(price)} грн`}</p>
      <div>
        <ProductItemSizes
          sizes={size}
          id={id}
          activeSize={activeSize}
          format="big"
        />
      </div>
      <div>
        {data.group != "accessories" && (
          <span className={classes.tableSize} onClick={openTableSize}>
            Таблица размеров
          </span>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        // onClick={isInCart ? openCart : this.putToCart}
        onClick={putToCart}
      >
        Купить
        {/* {isInCart ? "Товар уже в корзине" : "Добавить в корзину"} */}
      </Button>
      <AboutProduct productData={productData} />
    </div>
  );
}

function CommentBlock({ data, data: { author, date, text } }) {
  return (
    <div>
      <b>{author}</b>
      <span>{date}</span>
      <div>{text}</div>
    </div>
  );
}

function Reviews({ reviewsPorps }) {
  if (!reviewsPorps) return null;
  return (
    <div>
      <WhriteReview />
      {reviewsPorps.map(data => (
        <CommentBlock data={data} />
      ))}
    </div>
  );
}

function DisabledTabs({ characteristicPorps, reviewsPorps }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Характеристика" />
        <Tab label="Отзывы" />
      </Tabs>
      {value == 0 && (
        <Сharacteristic characteristicPorps={characteristicPorps} />
      )}
      {value == 1 && <Reviews reviewsPorps={reviewsPorps} />}
    </div>
  );
}

const advantages = [
  "Быстрая доставка",
  "Высокое качество",
  "Гарантия возврата",
  "Доступные цены",
  "Широкий ассортимент",
  "Коллекция 2019",
  "Постоянные акции",
  "Большой выбор на любой вкус",
  "Брендовые товары",
  "Модные тренды"
];

const mapStateToProps = state => {
  return {
    products: state.product,
    card: state.card,
    orderform: state.orderform,
    sliderProducts: state.slider.products,
    sex: state.filterData.filter.sex
    // headers: state.metaData.headers[state.filterData.filter.sex.includes("man") ? "man" : "wooman"]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCart: () => dispatch({ type: "OPEN_CART" }),
    putToCart: product => dispatch({ type: "TRY_PUT_TO_CART", product }),
    requestAndAddSlider: category =>
      dispatch({ type: "REQUEST_AND_ADD_PRODUCTS_TO_SLIDER", category }),
    addProduct: product => dispatch({ type: "ADD_PRODUCT", product }),
    openGallery: () => dispatch({ type: "SHOW_SLIDER_WINDOW" }),
    openTableSize: () => dispatch({ type: "TABLE_SIZE_ON" })
  };
};

class ProductCart extends React.PureComponent {
  state = { data: {} };

  componentDidMount() {
    this.getProduct();
    this.scrollToTop();
  }

  setDescription = () => {
    if (document.querySelector("meta[name='description']"))
      document.querySelector("meta[name='description']").remove();
    let meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", this.getDescription());
    document.getElementsByTagName("head")[0].appendChild(meta);
  };

  getDescription = () => {
    const { data } = this.state;
    if (data.description) return data.description;
    let composition =
      data.composition && data.composition.length > 5
        ? `, состав: ${data.composition}`
        : "";
    let color = data.color ? `, цвет: ${data.color}` : "";
    let brand = data.brand ? `, бренд: ${data.brand}` : "";
    let advantageN = data.id
      ? +`${data.id}`.slice(-1)
      : Math.round(Math.random() * 10);
    let advantage = advantages[advantageN];
    let customDesc = `${
      data.name
    }${color}${brand}${composition}, цена ${Math.round(
      data.price
    )} грн. ${advantage}`;
    return customDesc;
  };

  componentDidUpdate(prevProps) {
    this.props.orderform && this.redirectToOrderForm();
    if (prevProps.location.pathname != this.props.location.pathname) {
      this.scrollToTop();
      this.getProduct();
    }
  }

  getProduct = () => {
    const { id } = this.props.match.params;
    const isSlug = !Number.isInteger(id);
    this.setState({ loading: true });
    fetchGet(`/items/${id}`).then(data => {
      // if (data) {
      //   document.title = `${data.name} - купить в kilo. Высокое качество! Хорошие скидки.`;
      // }
      this.setState({ data, loading: false }, () => {
        // this.props.requestAndAddSlider(this.state.data.category);
        this.props.addProduct(data);
        this.setDescription();
      });
    });
  };

  scrollToTop = () => window.scroll({ top: 0, behavior: "smooth" });

  putToCart = () => {
    const { products, putToCart, match } = this.props;
    const product = products.find(
      product => product.slug_id == match.params.id
    );
    gtag("event", "Положили в корзину", {
      event_category: "События кнопок",
      event_action: "Положили в корзину"
    });
    putToCart(product);
  };

  redirectToOrderForm = () => this.props.history.push("/orderform");

  redirectToRoot = () => this.props.history.push("/");

  redirectToCategory = category =>
    this.props.history.push(`/categoryPage/${category}`);

  openGallery = e => {
    const windowWidth = window.innerWidth;
    const nodeName = e.target.nodeName;
    if (
      nodeName == "svg" ||
      nodeName == "path" ||
      nodeName == "BUTTON" ||
      nodeName == "SPAN" ||
      nodeName == "UL" ||
      nodeName == "IMG" ||
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
          enlargedImageClassName: "reactImageMagnifyBig",
          imageClassName: "reactImageMagnifySmall",
          enlargedImageContainerDimensions: {
            width: "150%",
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
      products,
      openTableSize,
      sex
    } = this.props;
    const { loading, data } = this.state;
    const { id } = data;
    const productData = products.find(product => product.id == id) || {};
    const { size, picture, name, category, price } = productData;
    const activeSize = productData.activeSize;
    const isInCart = card.data.some(cardItem => cardItem.id == id);

    if (loading) {
      return <KiloLoading />;
    }
    return (
      <div className={`${classes.root} product-cart`}>
        <TitleComponent
          title={`${data.name} - купить в KILO. Цена ${Math.round(
            data.price
          )} грн. Высокое качество!`}
        />
        <Header
          redirectToRoot={this.redirectToRoot}
          redirectToCategory={this.redirectToCategory}
        />
        <h1 className={classes.title}>{data.name}</h1>
        <Breadcrumbs
          links={[
            { href: "/", title: "Главная" },
            { href: "/orderform", title: "Форма заказа" }
          ]}
          category={category}
          name={name}
          redirectToRoot={this.redirectToRoot}
          redirectToCategory={this.redirectToCategory}
        />
        <WidgetPanel />
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
                    ? picture.map(srcPicture =>
                        this.sliderItem(srcPicture, data.name)
                      )
                    : picture
                }
                draggable
                arrows
                fade
                dots
                dotsClass={"slick-dots slick-thumb"}
                customPaging={i => {
                  return (
                    <a>
                      <img src={picture[i]} />
                    </a>
                  );
                }}
              />
            </div>

            <div className={`${classes.textContent} fluid__instructions`}>
              <DisabledTabs
                characteristicPorps={{
                  productData,
                  classes,
                  id: this.props.match.params.id,
                  price,
                  size,
                  activeSize,
                  data: this.state.data,
                  openTableSize,
                  putToCart: this.putToCart
                }}
                reviewsPorps={
                  this.state.data && this.state.data.product_comments
                }
              />
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
          productsParams={{ search_category: category, sex }}
          productIdExclud={id}
          title="С этим товаром смотрят"
        />
        <Footer redirectToRoot={this.redirectToRoot} />
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
        <TableSize
          dropShip={this.state.data && this.state.data.drop_ship}
          data={this.state.data && this.state.data.size_world}
          sex={sex}
          simple={this.state.data && !this.state.data.size_world}
          group={this.state.data && this.state.data.group}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductCart));
