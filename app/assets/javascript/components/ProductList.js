import React from 'react';
import ProductItem from './ProductItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    products: state.product,
    card: state.card
  }
}

const styles = theme => ({
    root: {
      marginLeft: 260,
      marginTop: 110,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  });

class ProductList extends React.Component {
    constructor(){
        super()
    }

  renderProductList(){
    const { products, card } = this.props
  return products.map(product => {
    window.card=card
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
 
  export default connect(mapStateToProps)(withStyles(styles)(ProductList));