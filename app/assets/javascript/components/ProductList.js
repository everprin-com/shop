import React from 'react';
import ProductItem from './ProductItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import fetchGetWithParams from "./api/fetchGetWithParams"

const mapStateToProps = state => {
  return {
    products: state.product,
    card: state.card
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProducts: products => dispatch({ type: 'ADD_PRODUCTS', products}),
  }
}

const styles = theme => ({
    root: {
      marginLeft: 260,
      marginTop: 75,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  });

class ProductList extends React.Component {
    constructor(){
      super()
    }

  componentDidMount() {
    fetchGetWithParams("items/", {search_color: "зеленый"})
      .then(data => this.props.addProducts(data))
  }

  renderProductList(){
    const { products, card } = this.props
    return products.map(product => {
      const inCard = card.data && card.data.some(cardItem => cardItem.id == product.id )
      return  <ProductItem data={product} inCard={inCard} />
      })
  }

  render() {
      const { classes } = this.props;
      return (
      <div className={classes.root}>
          {this.renderProductList()}
      </div>
      )
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductList));
