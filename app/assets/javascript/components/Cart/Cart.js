import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Close } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import styles from "./styles";

const mapStateToProps = state => {
  return {
    card: state.card
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeCart: () => dispatch({ type: "CLOSE_CART" }),
    redirToOrderForm: () => dispatch({ type: "OPEN_ORDER_FORM" }),
    deleteFromCart: id => dispatch({ type: "DELETE_FROM_CART", id }),
    setAmount: (id, amount) => dispatch({ type: "SET_AMOUTN", id, amount })
  };
};

class Cart extends React.PureComponent {
  deleteProduct = id => {
    this.props.deleteFromCart(id);
    if (this.props.card.data.length < 1) this.props.closeCart();
  };

  renderProducts = () => {
    const { classes, card, setAmount } = this.props;
    return card.data.map(cartDataItem => {
      const handleChange = event => {
        setAmount(cartDataItem.id, event.target.value);
      };

      const srcImg = Array.isArray(cartDataItem.picture)
        ? cartDataItem.picture[0]
        : cartDataItem.picture;

      return (
        <Paper className={classes.root} key={cartDataItem.id} elevation={1}>
          <div className={classes.content}>
            <div className={classes.imageWrapper}>
              <img src={srcImg} className={classes.image} />
            </div>
            <div className={classes.title}>{cartDataItem.name}</div>
            <div className={classes.price}>{cartDataItem.activeSize}</div>
            <div className={classes.price}>
              <TextField
                id="standard-number"
                value={cartDataItem.amount}
                onChange={handleChange}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  className: classes.inputAmount
                }}
                margin="normal"
                inputProps={{ min: "1", max: "20", step: "1" }}
              />
            </div>
            <div className={classes.price}>
              {`${cartDataItem.price * cartDataItem.amount} грн`}
            </div>
            <div className={classes.price}>
              <Button
                className={classes.buttonClose}
                onClick={() => this.deleteProduct(cartDataItem.id)}
              >
                <Close />
              </Button>
            </div>
          </div>
        </Paper>
      );
    });
  };
  render() {
    const {
      classes,
      redirToOrderForm,
      closeCart,
      card,
      orderForm
    } = this.props;
    const totalPrice = card.data.reduce((prev, next) => {
      return prev + next.price * next.amount;
    }, 0);

    return (
      <div>
        {this.renderProducts()}
        <div className={classes.totalBlock}>
          <div>
            {!orderForm && (
              <Button
                variant="contained"
                className={classes.button}
                onClick={closeCart}
              >
                Продолжить покупки
              </Button>
            )}
          </div>
          <div>
            <div
              className={classes.totalPrice}
            >{`Итого: ${totalPrice} грн`}</div>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => {
                ga("send", "event", "События кнопок", "Оформление заказа");
                orderForm ? closeCart() : redirToOrderForm();
              }}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Cart));
