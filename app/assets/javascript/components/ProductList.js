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
    // this.sendFetch()
    this.search()
  }

  sendFetch = () => {

    var myInit = {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }

    fetch("/items", myInit)
    .then(res => res.json())
    .then(data => this.setState({data}))

}

search = () => {

    const formData = new FormData();
    formData.append("search[name_search]", 'блузка');
    var myInit = {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }
    console.log(formData)


    fetch("/items?name_search=&search_color=СИНИЙ&search_category=&price_search_from=400&price_search_to=&commit=Искать", myInit)
    .then(res => res.json())
    .then(data => this.setState({data}))
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