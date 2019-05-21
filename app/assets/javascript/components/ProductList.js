import React from 'react';
import ProductItem from './ProductItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const mapStateToProps = state => {
  return {
    products: state.product,
    card: state.card,
    loading: state.general.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestAndAddProducts: params => dispatch({ type: 'REQUEST_AND_ADD_PRODUCTS', params}),
    handlePagination: () => dispatch({ type: 'HANDLE_PAGINATION'}),
  }
}

const styles = theme => ({
    root: {
      marginLeft: 260,
      marginTop: 75,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      minHeight: '100vh',
    },
    rootCart: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      minHeight: '100vh',
    },
    loader: {
      display: 'flex',
      justifyContent: 'center',
      padding: 50,
      marginLeft: 260,
    }
  });

class ProductList extends React.Component {
  state = {scroll: 0}

  componentDidMount() {
    const { requestAndAddProducts, productsParams } = this.props
    requestAndAddProducts(productsParams)
    window.onscroll = () => this.scrollChange()
  }

  getElemntsHeight = () => {
    const heightProductList = document.getElementsByClassName("productList")[0].offsetHeight
    const heightHeader = document.getElementsByClassName("header")[0].offsetHeight
    return heightProductList + heightHeader
  }

  scrollChange() {
   let scrolled = window.pageYOffset || document.documentElement.scrollTop;
   const positioBbuttomDisplay = scrolled + window.innerHeight
   const isAchiveBottom = (this.getElemntsHeight() - positioBbuttomDisplay) < 50
   if ( isAchiveBottom && !this.props.loading ) {
    this.props.handlePagination()
   }
  }

  renderProductList(){
    const { products, card } = this.props
    return products.map((product, _i )=> {
      const inCard = card.data && card.data.some(cardItem => cardItem.id == product.id )
      return  <ProductItem data={product} inCard={inCard} key={_i} />
      })
  }

  render() {
      const { classes, loading, forCart } = this.props;
      return (
        <div>
          <div className={`${forCart ? classes.rootCart: classes.root} productList`}>
            {this.renderProductList()}
          </div>
          {loading && <div className={classes.loader}>
              <CircularProgress />
          </div>}
        </div>
      )
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductList));
