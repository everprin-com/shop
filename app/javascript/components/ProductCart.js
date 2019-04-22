import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import Header from './Header'
import AboutProduct from './AboutProduct'
import {  products } from './mockData'
import { withStyles } from '@material-ui/core/styles';
import Sizes from './Sizes'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

// import watchImg687 from 'a.lmcdn.ru/img236x341/L/O/LO019EWCCQQ2_7453089_1_v1.jpg';
// import watchImg1200 from './wristwatch_1200.jpg';


const mapStateToProps = state => {
  return {
    products: state.product,
    card: state.card,
    orderform: state.orderform,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openCart: () => dispatch({ type: 'OPEN_CART'}),
    putToCart: product => dispatch({ type: 'PUT_TO_CART', product }),
  }
}

const styles = theme => ({
    price: {
        color: '#000',
        fontSize: 24,
        lineHeight: '32px',
    },
    button: {
        fontSize: 16,
    }
})

class ProductCart extends Component {
    constructor(props){
        super(props)
    }

    componentDidUpdate(prevProps){
        this.props.orderform && this.redirectToOrderForm()
      }

    state = { 
        productData : this.props.products.find(product=>product.id == this.props.match.params.id)
    }

    putToCart = () => this.props.putToCart(this.state.productData)

    redirectToOrderForm = () => this.props.history.push('/orderform')

    openCart = () => this.props.openCart()

    render() {
        const { classes, products, card, match } = this.props
        const { productData } = this.state
        const src = "http:" + products.find(product => product.id == match.params.id).img
        const isInCart = card.data.some(cardItem => cardItem.id == match.params.id )
        return (
            <div className="fluid">
                <Header />
                <div className="fluid__image-container">
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src
                        },
                        largeImage: {
                            src,
                            width: 1200,
                            height: 1800
                        }
                    }} />
                </div>
                <div className="fluid__instructions">
                    <h3>{productData.title}</h3>
                    <p className={classes.price}>
                        {`${productData.price} грн`}
                    </p>
                    <p>
                       Размер: <Sizes />
                    </p>
                    <p>
                         <a href="#"> Таблица размеров</a>
                    </p>
                    <Button variant="contained" color="primary" className={classes.button} onClick= { isInCart ? this.openCart : this.putToCart}>
                       {isInCart ? "Товар уже в корзине" : "Добавить в корзину" } 
                    </Button>
                    <AboutProduct productData={productData} />
                </div>

                <div style={{height: '500px'}} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductCart))