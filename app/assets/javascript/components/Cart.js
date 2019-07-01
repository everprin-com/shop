import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Close } from '@material-ui/icons'
import TextField from '@material-ui/core/TextField';

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
    setAmount: (id, amount)=> dispatch({ type: 'SET_AMOUTN', id, amount}),
  }
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 800,
    margin: '10 0',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    margin: '0 30px'
  },
  totalBlock:{
    margin: 20,
    // flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    fontFamily: 'Arial,Helvetica,FreeSans,"Liberation Sans","Nimbus Sans",sans-serif',
    fontSize: 24,
  },
  button: {
    fontSize: 16
  },
  imageWrapper: {
    width: 150,
    height: 150,
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 50,
  },
});

function Cart(props) {
  const { classes, card, redirToOrderForm, deleteFromCart, closeCart } = props;
  const totalPrice = card.data.reduce((prev, next)=> { return (prev + next.price*next.amount)}, 0)
  const renderProducts = card.data.map( cartDataItem => {
    const handleChange = event => {
      props.setAmount(cartDataItem.id, event.target.value) 
    };
    return  (<Paper className={classes.root} key={cartDataItem.id} elevation={1}>
    <div className={classes.content}>
      <div className={classes.imageWrapper}>
          <img src={cartDataItem.picture} className={classes.image}/>
      </div>
      <div className={classes.title}>{cartDataItem.name}</div>
      <div className={classes.price}>
        <TextField
            id="standard-number"
            value={cartDataItem.amount}
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
        />
      </div>
      <div className={classes.price}>{`${cartDataItem.price * cartDataItem.amount} грн`}</div>
      <div className={classes.price}>
        <Button className={classes.buttonClose} onClick={deleteFromCart.bind(null, cartDataItem.id)}>
          <Close />
        </Button>
      </div>
    </div>
    </Paper>)
    })
    return (
      <div>
        {renderProducts}
        <div className={classes.totalBlock}>
        <div>
            <Button variant="contained" className={classes.button} onClick={closeCart}>
              Продолжить покупки
            </Button>
          </div>
          <div>
            <div className={classes.totalPrice}>
              {`Итого: ${totalPrice} грн`}
            </div>
            <Button variant="contained" color="secondary" className={classes.button} onClick={redirToOrderForm}>
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    );
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));