import React from "react";
import ReactImageMagnify from "react-image-magnify";
import Header from "../Header/Header";
import AboutProduct from "../AboutProduct/AboutProduct";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Footer from "../Footer/Footer";
import fetchGet from "../api/fetchGet";
import Slider from "../Slider/Slider";
import ProductList from "../ProductList/ProductList";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import TableSize from "../TableSize/TableSize";
import styles from "./styles";
import WidgetPanel from "../HelpWidget/WidgetPanel";
import KiloLoading from "../KiloLoading";
import TitleComponent from "../TitleComponent";
import CustomTabs from "../CustomTabs";
import advantages from "../constants/advantages";
import Stars from "../Stars";
import SocialIcon from "../SocialIcon";
import DialogSwitcher from "../DialogSwitcher";
import googleEvents from "../constants/googleEvents";
// import { formateName } from "../Utils"

const mapStateToProps = state => {
  return {
    products: state.product,
    card: state.card,
    orderform: state.orderform,
    sliderProducts: state.slider.products,
    sex: state.filterData.filter.sex,
    comments: state.comment
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
  state = { data: {}, activeTab: 0 };

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
      this.handleTabChange();
    }
  }

  getProduct = () => {
    const { id } = this.props.match.params;
    const isSlug = !Number.isInteger(id);
    this.setState({ loading: true });
    fetchGet(`/items/${id}`).then(data => {
      if (data) {
        this.setState({ data, loading: false }, () => {
          // this.props.requestAndAddSlider(this.state.data.category);
          this.props.addProduct(data);
          this.setDescription();
        });
      } else {
        this.redirectToRoot();
      }
    });
  };

  scrollToTop = () => window.scrollTo(0, 0);

  putToCart = () => {
    const { products, putToCart, match } = this.props;
    const product = products.find(
      product => product.slug_id == match.params.id
    );
    gtag(
      "event",
      googleEvents["Положили в корзину"].title,
      googleEvents["Положили в корзину"].data
    );
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
      nodeName == "A" ||
      windowWidth < 1000
    )
      return;
    gtag(
      "event",
      googleEvents["Показать галерею товара"].title,
      googleEvents["Показать галерею товара"].data
    );
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

  handleTabChange = (_event = null, activeTab = 0) => {
    this.setState({ activeTab });
    if (activeTab === 1) {
      gtag(
        "event",
        googleEvents["Чтение отзывов"].title,
        googleEvents["Чтение отзывов"].data
      );
    }
    if (activeTab === 2) {
      gtag(
        "event",
        googleEvents["Чтение доставки и оплаты"].title,
        googleEvents["Чтение доставки и оплаты"].data
      );
    }
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
      sex,
      comments
    } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <KiloLoading />;
    }

    const { data } = this.state;
    const { id } = data;
    const productData = products.find(product => product.id == id) || {};
    const {
      size,
      picture,
      name,
      category,
      price,
      available_product
    } = productData;
    const activeSize = productData.activeSize;
    // const isInCart = card.data.some(cardItem => cardItem.id == id);
    const commentsArr = comments.data.filter(
      comment => comment.slug_id == match.params.id
    );

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
        <h1 className={classes.title}>{data.name}</h1>
        <Stars
          rate={
            data.average_voted && Math.round(data.average_voted.average_mark)
          }
          className="product-rate"
          commentsArr={commentsArr}
          amount={data.average_voted && data.average_voted.count_voted}
          withLabel
          handleTabChange={this.handleTabChange}
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
              <span className="social-icons">
                <SocialIcon />
                <SocialIcon instagram />
              </span>
            </div>

            <div className={`${classes.textContent} fluid__instructions`}>
              <CustomTabs
                characteristicPorps={{
                  productData,
                  classes,
                  id: this.props.match.params.id,
                  price,
                  size,
                  activeSize,
                  data: this.state.data,
                  openTableSize,
                  putToCart: this.putToCart,
                  availableProduct: available_product
                }}
                commentsArr={commentsArr}
                amount={data.average_voted && data.average_voted.count_voted}
                slugId={this.props.match.params.id}
                category={this.state.data && this.state.data.category}
                reviewsPorps={
                  this.state.data && this.state.data.product_comments
                }
                handleTabChange={this.handleTabChange}
                activeTab={this.state.activeTab}
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
        <DialogSwitcher
          dialogs={[
            { title: "Выберите размер", type: "size" },
            {
              title: "Галерея товара",
              props: { picture, classes },
              type: "slider"
            },
            {
              title: "Отзыв о товаре",
              type: "writeReview",
              className: "write-review-dialog",
              props: { slugId: this.props.match.params.id, category }
            },
            { title: "Нам жаль, что Вы нас покидаете...", type: "exit" }
          ]}
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
