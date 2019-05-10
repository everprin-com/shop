import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import Header from './Header'
import AboutProduct from './AboutProduct'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import ProductItemSizes from './ProductItemSizes';
import DialogWindow from './Dialog';
import ChooseSize from './ChooseSize';
import Footer from './Footer';
import fetchGet from "./api/fetchGet"
import { getSizes } from './Utils';

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
    root: {
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        fontFamily: "Arial",
        flexDirection: "column",
        lineHeight: "1.3",
        fontSize: "16px",
    },
    price: {
        color: '#000',
        fontSize: 24,
        lineHeight: '32px',
    },
    button: {
        fontSize: 16,
    },
    mainContent: {
        display: 'flex'
    }
})

class ProductCart extends React.Component {
    state = {}
    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        const { id } = this.props.match.params
        fetchGet(`/items/${id}`)
        .then(data => this.setState({data}))
    }

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
        const productData  = this.state.data || {}
        const { size, picture } = productData
        let sizes = getSizes(size)
        // const activeSize = products.find(product => product.id == id).activeSize
        const isInCart = card.data.some(cardItem => cardItem.id == id )
        return (
            <div className={classes.root}>
                <Header />
                <div className={classes.mainContent}>
                    <div className="fluid__image-container">
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: picture,
                            },
                            largeImage: {
                                src: picture,
                                width: 1200,
                                height: 1800,
                            }
                        }} />
                    </div>
                    <div className="fluid__instructions">
                        <h3>{productData.name}</h3>
                        <p className={classes.price}>
                            {`${productData.price} грн`}
                        </p>
                        <p>
                        <ProductItemSizes
                                sizes={sizes}
                                id={+this.props.match.params.id}
                                // activeSize={activeSize}
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
                    </div>
                </div>
                <Footer />
                <DialogWindow title="Выберите размер" Component={ChooseSize} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductCart))