import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import ProductItemSizes from './ProductItemSizes';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const mapDispatchToProps = dispatch => {
  return {
    openCart: () => dispatch({ type: 'OPEN_CART'}),
    putToCart: product => dispatch({ type: 'TRY_PUT_TO_CART', product }),
  }
}

const styles = theme => ({
  card: {
    zIndex: 0,
    position: 'relative',
    cursor: 'pointer',
    width: 210,
    margin: '5px 5px 0 5px',
    // border: "10px solid transparent",
    transition: 'transform .2s',
    overflow: 'inherit',
    '&:hover': {
      zIndex: 1,
      // borderTop: '10px solid #eee',
      transform: 'scale(1.05, 1.05)',
      // boxShadow: '2px 2px 16px rgba(0,0,0,.24), -2px -2px 16px rgba(0,0,0,.24) ',
    },
  },
  cardDesctiption: {
    fontSize: 'auto',
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: '16px',
    fontWeight: 'bold',
    
  },
  category: {
    color: '#888',
    fontSize: '14px',
    margin: '5px'
  },
  oldPrice:{
    color: '#a6a5a5',
    fontSize: '14px',
    textDecoration: 'line-through',
    paddingBottom: '5px',
  },
  newPrice:{
    color: 'f74137',
    fontSize: '16px',
  },
  price: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  media: {
    height: 190,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
  },
  actions: {
    display: 'flex',
  },
  productItemLink: {
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    '&:hover':{
      textDecoration: 'none',
    },
  },
  button: {
    margin: '15px auto',
    width: '100%',
    fontSize: '15px',
  },
  cardIn:{
    // left: 0,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // right: 0,
  },
  activeCard: {
    position: 'absolute',
    textAlign: 'center',
    top:'98%',
    // width: 209,
    left: 0,
    right: 0,
    display: 'block',
    background: '#fff',
    boxShadow: '1px 1px rgba(0,0,0, 0.1), -1px 1px rgba(0,0,0,0.1)',
  },
  cardContent:{
    padding: 5,
    '&:last-child': {
      paddingBottom:0,
    },
  },
});

class ProductItem extends React.Component {
  state = { expanded: false, hover: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  onLive = () => this.setState({ hover: false })

  onHover = () => this.setState({ hover: true })

  putToCart = () => this.props.putToCart(this.props.data)

  openCart = () => this.props.openCart()


  render() {
    const { classes, inCard, data } = this.props;
    const { img, price, title, category, id, sizes, activeSize } = data;
    const oldPrice = Math.round(price + price/2 + price/10)
    return (
      <Card
        className={classes.card}
        onMouseOver={this.onHover}
        onMouseLeave={this.onLive}
      >
        <Link
        className={classes.productItemLink}
        to={{
          pathname: `/productcart/${id}`,
          state: { data }
        }}
        >
          <CardMedia
            className={classes.media}
            image={img}
            title={title}
          />

          <CardContent className={classes.cardContent}>
            <Typography component="div" className ={classes.cardDesctiption} >
              <div className={classes.title}>
                {title}
              </div>
              <div className={classes.category}>
                {category}
              </div>
              <div className={classes.price}>
                <div className={classes.oldPrice}>
                  {`${oldPrice} грн`}
                </div>
                <div className={classes.newPrice}>
                  {`${price} грн`}
                </div>
              </div>
            </Typography>
          </CardContent>

        </Link>
          { this.state.hover && <div className={classes.activeCard}>
            <CardActions className={classes.actions} disableActionSpacing>
                <ProductItemSizes id={id} sizes={sizes} activeSize={activeSize} />
            </CardActions>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.putToCart}>
          {"Добавить в корзину"} 
            </Button>
          </div>}
      </Card>
    );
  }
}

ProductItem.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(connect(null, mapDispatchToProps)(ProductItem))