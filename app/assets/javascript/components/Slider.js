import React from 'react';
import { Carousel } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { Link } from "react-router-dom";
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      padding: 5,
      maxWidth: 800,
      margin: '10 0',
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    title: {
      margin: 0
    },
    totalBlock:{
      margin: 20,
      // flexDirection: 'column',
      display: 'flex',
      alignItems: 'flex-end',
      fontFamily: 'Arial,Helvetica,FreeSans,"Liberation Sans","Nimbus Sans",sans-serif',
      fontSize: 24,
      justifyContent: 'flex-end'
    },
    button: {
      fontSize: 16
    },
    imageWrapper: {
      width: 200,
      height: 200,
    },
    image: {
      height: '100%',
    },
    buttonClose: {
      borderRadius: '50%',
      width: 64,
      height: 64,
    },
    totalPrice: {
      marginBottom: 5
    },
    contentText: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 100,
    },
    contentTextBottom: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 20,
    },
  
  });

function onChange(a, b, c) {
  console.log(a, b, c);
}

function ArrNext(props){
    const { className, style, onClick } = props;
    return (
        <Fab
            aria-label="Add"
            onClick={onClick}
            className="arrSlider next"
        >
            <NavigateNext className="navSlider" />
        </Fab>
    )
}

function ArrPrev(props){
    const { className, style, onClick } = props;
    return (
        <Fab
            aria-label="Add"
            onClick={onClick}
            className="arrSlider prev"
        >
            <NavigateBefore className="navSlider" />
        </Fab>
    )
}

const Item = props => {
    const {picture, name, price, classes, id} = props
return (
    <Link  to={`/productcart/${id}`} >
        <Paper>
            <div className={classes.root} elevation={1}>
                <div className={classes.content}>
                    <div className={classes.imageWrapper}>
                        <img src={picture} className={classes.image}/>
                    </div>
                    <div className={classes.contentText}>
                        <div className={classes.title}>
                            {name}
                        </div>
                        <div className={classes.contentTextBottom}>
                            <div className={classes.price}>
                                {`${price} грн`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    </Link>
)
}

const CarouselItem = withStyles(styles)(Item)

function myCarousel({title, simple, products, ...props}) {
    if (!products) return null
    const settings = {
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
    }
    return (
        <div>
            <div className="titleSlider">{title}</div>
            <Carousel {...settings} afterChange={onChange} {...props}>
                {products.map((product, i) => {
                  if (simple) {
                    return  product
                  } else {
                    return < CarouselItem {...product} redirect={props.redirect} key={i} />
                  }}
                )}
            </Carousel>
        </div>
    )
}


export default myCarousel