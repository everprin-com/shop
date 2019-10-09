import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ProductItemSizes from "../ProductItemSizes/ProductItemSizes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { convertPrice, isEqualArr, textWithDots } from "../Utils";
import Badge from "@material-ui/core/Badge";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import NavigateNext from "@material-ui/icons/NavigateNext";
import styles from "./styles";

const mapDispatchToProps = dispatch => {
  return {
    openCart: () => dispatch({ type: "OPEN_CART" }),
    putToCart: product => dispatch({ type: "TRY_PUT_TO_CART", product })
  };
};

class ProductItem extends React.PureComponent {
  constructor(props) {
    super(props);
    const { picture } = props.data;
    const currentImg = Array.isArray(picture) ? picture[0] : picture;
    this.state = {
      expanded: false,
      hover: false,
      imgs: picture,
      currentImgIndex: null,
      currentImg
    };
  }

  componentDidUpdate({ data }) {
    if (isEqualArr(data.picture, this.props.data.picture)) return;
    const { picture } = this.props.data;
    const currentImg = Array.isArray(picture) ? picture[0] : picture;
    this.setState({ imgs: picture, currentImg });
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  onLive = () => this.setState({ hover: false });

  onHover = () => this.setState({ hover: true });

  putToCart = () => {
    gtag("event", "Добавление в корзину", {'event_category': 'События кнопок', 'event_action': "Добавление в корзину"})
    this.props.putToCart(this.props.data)
  }

  openCart = () => this.props.openCart();

  prevImg = () => {
    this.setState(prevState => {
      return prevState.imgs.indexOf(prevState.currentImg) == 0
        ? {
            currentImgIndex: prevState.imgs.length - 1,
            currentImg: prevState.imgs[prevState.imgs.length - 1]
          }
        : {
            currentImgIndex: prevState.currentImgIndex - 1,
            currentImg: prevState.imgs[prevState.currentImgIndex - 1]
          };
    });
  };

  nextImg = () => {
    this.setState(prevState => {
      return prevState.imgs.indexOf(prevState.currentImg) ==
        prevState.imgs.length - 1
        ? {
            currentImgIndex: 0,
            currentImg: prevState.imgs[0]
          }
        : {
            currentImgIndex: prevState.currentImgIndex + 1,
            currentImg: prevState.imgs[prevState.currentImgIndex + 1]
          };
    });
  };

  linkHandler = e => {
    if (e.target.nodeName == "svg" || e.target.nodeName == "path") {
      e.preventDefault();
    }
  };

  render() {
    const { classes, inCard, data, windowWidthLess1000 } = this.props;
    let {
      picture,
      price: notConvertedPrice,
      name,
      category,
      id,
      size,
      activeSize,
      slug_id
    } = data;
    const { price, saleShow, oldPrice } = convertPrice(notConvertedPrice);
    const shouldShowBottom = this.state.hover || windowWidthLess1000;
    const withoutSizeName = name && name.replace(/[0-9-]*$/g, "");
    const isSlug = !!slug_id
    const shouldShowArr =
      Array.isArray(picture) && picture.length > 1 && shouldShowBottom;
    return (
      <Card
        className={classes.card}
        onMouseOver={this.onHover}
        onMouseLeave={this.onLive}
      >
        {" "}
        <Link
          className={classes.productItemLink}
          to={`/productcart/${isSlug ? slug_id : id}`}
          onClick={this.linkHandler}
        >
          <div className={classes.imgWrap}>
            {shouldShowArr && (
              <NavigateBefore
                onClick={this.prevImg}
                className={`${classes.navArr} ${classes.navArrPrev}`}
              />
            )}
            <Badge
              invisible={id % 3 != 0}
              className={classes.badge}
              badgeContent={`-${saleShow}%`}
              color="secondary"
            />

            <CardMedia
              className={classes.media}
              image={this.state.currentImg}
              title={withoutSizeName}
            />
            {shouldShowArr && (
              <NavigateNext
                onClick={this.nextImg}
                className={`${classes.navArr} ${classes.navArrNext}`}
              />
            )}
          </div>

          <CardContent className={classes.cardContent}>
            <Typography component="div" className={classes.cardDesctiption}>
              <div className={classes.title}>{textWithDots(withoutSizeName, 52)}</div>
              <div className={classes.category}>{category}</div>
              <div className={classes.price}>
                <div className={classes.oldPrice}>{`${oldPrice} грн`}</div>
                <div className={classes.newPrice}>{`${price} грн`}</div>
              </div>
            </Typography>
          </CardContent>
        </Link>
        {shouldShowBottom && (
          <div className={classes.activeCard}>
            <CardActions className={classes.actions} disableActionSpacing>
              <ProductItemSizes id={slug_id} sizes={size} activeSize={activeSize} />
            </CardActions>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.putToCart}
            >
              Купить
            </Button>
          </div>
        )}
      </Card>
    );
  }
}

ProductItem.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(ProductItem)
);
