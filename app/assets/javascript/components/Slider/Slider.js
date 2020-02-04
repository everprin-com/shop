import React from "react";
import Slider from "react-slick";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import NavigateNext from "@material-ui/icons/NavigateNext";
import styles from "./styles";

function ArrNext(props) {
  const { className, style, onClick } = props;
  return (
    <Fab aria-label="Add" onClick={onClick} className="arrSlider next">
      <NavigateNext className="navSlider" />
    </Fab>
  );
}

function ArrPrev(props) {
  const { className, style, onClick } = props;
  return (
    <Fab aria-label="Add" onClick={onClick} className="arrSlider prev">
      <NavigateBefore className="navSlider" />
    </Fab>
  );
}

const Item = props => {
  const { picture, name, price, classes, id, slug_id } = props;
  return (
    <Link to={`/productcart/${slug_id ? slug_id : id}`}>
      <Paper>
        <div className={classes.root} elevation={1}>
          <div className={classes.content}>
            <div className={classes.imageWrapper}>
              <img src={picture} className={classes.image} />
            </div>
            <div className={classes.contentText}>
              <div className={classes.title}>{name}</div>
              <div className={classes.contentTextBottom}>
                <div className={classes.price}>{`${price} грн`}</div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </Link>
  );
};

const CarouselItem = withStyles(styles)(Item);

function myCarousel({
  title,
  simple,
  mainPage,
  className,
  firstEnter,
  products,
  ...props
}) {
  if (!products) return null;
  // if (mainPage && !firstEnter) return null;
  const settings = {
    lazyLoad: true,
    nextArrow: <ArrNext />,
    prevArrow: <ArrPrev />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className={className}>
      <div className="titleSlider">{title}</div>
      <Slider {...settings} {...props}>
        {products.map((product, i) => {
          if (simple) {
            return product;
          } else {
            return (
              <CarouselItem {...product} redirect={props.redirect} key={i} />
            );
          }
        })}
      </Slider>
    </div>
  );
}

export default myCarousel;
