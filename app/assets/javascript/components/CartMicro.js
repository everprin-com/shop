import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    card: state.card
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeCart: () => dispatch({ type: 'CLOSE_CART'}),
    redirToOrderForm: () => dispatch({ type: 'OPEN_ORDER_FORM'}),
    deleteFromCart: id => dispatch({ type: 'DELETE_FROM_CART', id}),
  }
}

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
    width: 100,
    height: 100,
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
    minWidth: 200,
  },
  contentTextBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  }
});

function MicroCart(props) {
  const { classes, card, redirToOrderForm, deleteFromCart, closeCart } = props;
  const totalPrice = card.data.reduce((prev, next)=> { return (prev + next.price)}, 0)
  const renderProducts = card.data.map( cartDataItem => {
    const {picture, title, amount, price} = cartDataItem
    return  (<div className={classes.root} elevation={1} key={cartDataItem.id}>
    <div className={classes.content}>
      <div className={classes.imageWrapper}>
          <img src={picture} className={classes.image}/>
      </div>
      <div className={classes.contentText}>
        <div className={classes.title}>{title}</div>
        <div className={classes.contentTextBottom}>
          <div className={classes.price}>{`${amount} шт`}</div>
          <div className={classes.price}>{`${amount ? price * amount : price} грн`}</div>
        </div>
      </div>
    </div>
    </div>)
    })
    return (
      <Paper>
        {renderProducts}
        <div className={classes.totalBlock}>
            <div className={classes.totalPrice}>
              {`Итого: ${totalPrice} грн`}
            </div>
        </div>
      </Paper>
    );
}

MicroCart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MicroCart));