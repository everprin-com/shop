import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import Header from './Header'
import AboutProduct from './AboutProduct'
import {  products } from './mockData'
import { withStyles } from '@material-ui/core/styles';
import Sizes from './Sizes'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import ProductItemSizes from './ProductItemSizes';
import DialogWindow from './Dialog';
import ChooseSize from './ChooseSize'

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
    putToCart: product => dispatch({ type: 'TRY_PUT_TO_CART', product }),
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

class ProductCart extends React.Component {
    componentDidUpdate(prevProps){
        this.props.orderform && this.redirectToOrderForm()
      }

    putToCart = () => {
        const {products, putToCart, match }  = this.props
        const activeSize = products.find(product => product.id == match.params.id).activeSize
        putToCart({...this.props.location.state.data, activeSize})
    }

    redirectToOrderForm = () => this.props.history.push('/orderform')

    render() {
        const { classes, products, card, match, location, openCart } = this.props
        const { id } = match.params
        const productData  = location.state.data
        const activeSize = products.find(product => product.id == id).activeSize
        const src = "http:" + location.state.data.img
        const isInCart = card.data.some(cardItem => cardItem.id == id )
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
                       <ProductItemSizes
                            sizes={productData.sizes}
                            id={+this.props.match.params.id}
                            activeSize={activeSize}
                            format="big"
                        />
                    </p>
                    <p>
                        <a href="#"> Таблица размеров</a>
                    </p>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={ isInCart ? openCart : this.putToCart}
                    >
                       {isInCart ? "Товар уже в корзине" : "Добавить в корзину" } 
                    </Button>
                    <AboutProduct productData={productData} />
                    <DialogWindow title="Выберите размер" Component={ChooseSize} />
                </div>

                <div style={{height: '500px'}} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductCart))