import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ProductItemSizes from "./ProductItemSizes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSizes, isEqualArr } from "./Utils";
import Badge from "@material-ui/core/Badge";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import NavigateNext from "@material-ui/icons/NavigateNext";

const mapDispatchToProps = dispatch => {
  return {
    openCart: () => dispatch({ type: "OPEN_CART" }),
    putToCart: product => dispatch({ type: "TRY_PUT_TO_CART", product })
  };
};

const styles = theme => ({
  card: {
    zIndex: 0,
    position: "relative",
    cursor: "pointer",
    width: 210,
    margin: "5px 5px 0 5px",
    // border: "10px solid transparent",
    transition: "transform .2s",
    overflow: "inherit",
    minHeight: 430,
    "&:hover": {
      zIndex: 1,
      // borderTop: '10px solid #eee',
      transform: "scale(1.05, 1.05)"
      // boxShadow: '2px 2px 16px rgba(0,0,0,.24), -2px -2px 16px rgba(0,0,0,.24) ',
    },
    [theme.breakpoints.down("xs")]: {
      width: 340
    }
  },

  cardDesctiption: {
    fontSize: "auto",
    textAlign: "center"
  },
  title: {
    color: "#333",
    fontSize: "14px",
    fontWeight: "bold"
  },
  category: {
    color: "#888",
    fontSize: "14px",
    margin: "0 auto 5px"
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
  price: {
    display: "flex",
    justifyContent: "center"
  },
  media: {
    height: 190,
    paddingTop: "56.25%", // 16:9
    backgroundSize: "contain"
  },
  actions: {
    display: "flex",
    padding: "0 4px 7px"
  },
  productItemLink: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    height: 430,
    // justifyContent: 'space-around',
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  },
  button: {
    margin: "0px auto 15px",
    width: "90%",
    fontSize: "15px"
  },
  cardIn: {
    // left: 0,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // right: 0,
  },
  activeCard: {
    position: "absolute",
    textAlign: "center",
    top: "98%",
    // width: 209,
    left: 0,
    right: 0,
    display: "block",
    background: "#fff",
    boxShadow: "1px 1px rgba(0,0,0, 0.1), -1px 1px rgba(0,0,0,0.1)",
    [theme.breakpoints.down("xs")]: {
      position: "static",
      marginTop: 40,
    }
  },
  cardContent: {
    padding: 5,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  badge: {
    float: `left`,
    margin: `20px 30px`
  },
  navArr: {
    fontSize: 40,
    position: "absolute",
    top: "50%",
    background: "#fff",
    color: "#aaa",
    transform: "translate(0, -50%)"
  },
  navArrNext: {
    right: 0
  },
  navArrPrev: {
    left: 0
  },
  imgWrap: {
    position: "relative"
  }
});

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

  putToCart = () => this.props.putToCart(this.props.data);

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
    const { classes, inCard, data } = this.props;
    let { picture, price, name, category, id, size, activeSize } = data;
    price = Math.round(+price);
    const sales = [30, 40, 50, 25, 55, 60, 45, 35, 65, 40];
    const sale =
      sales[("" + price).split("")[("" + price).split("").length - 1]];
    const oldPrice = Math.round(price + (price * sale) / 100);
    const saleShow = 100 - Math.round((price * 100) / oldPrice);
    const windowWidth = window.innerWidth;
    const shouldShowBottom = this.state.hover || windowWidth < 1000;
    const withoutSizeName = name.replace(/[0-9-]*$/g, "");
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
          to={{
            pathname: `/productcart/${id}`,
            state: { data }
          }}
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
              <div className={classes.title}>{withoutSizeName}</div>
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
              <ProductItemSizes id={id} sizes={size} activeSize={activeSize} />
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
