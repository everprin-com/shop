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
    products: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
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

    state = { 
        productData : this.props.products.find(product=>product.id == this.props.id)
    }

    putToCart = () => { this.props.putToCart(this.state.productData) }

    render() {
        const { classes, products } = this.props
        const { productData } = this.state
        const src = "http:" + products.find(product=>product.id == this.props.id).img
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
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.putToCart}>
                        Добавить в корзину
                    </Button>
                    <AboutProduct productData={productData} />
                </div>

                <div style={{height: '500px'}} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductCart))