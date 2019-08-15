import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Input from "../Input/Input";
import Tooltip from "../Tooltip/Tooltip";
import { ShoppingCart } from "@material-ui/icons";
import CartWithDialog from "../Cart/CartWithDialog";
import Badge from "@material-ui/core/Badge";
import { connect } from "react-redux";
import styles from "./styles";
  
const mapStateToProps = state => {
  return {
    card: state.card
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeCart: () => dispatch({ type: "CLOSE_CART" }),
    openCart: () => dispatch({ type: "TRY_OPEN_CART" })
  };
};

class Panel extends React.PureComponent {
  render() {
    const { classes, card, openCart } = this.props;
    const cardLengh = card.data.length;
    const cardSum = card.data.reduce((prev, next) => prev + +next.price, 0);
    return (
      <div className={classes.panel}>
        <Toolbar className={classes.root}>
          <Input />
          <Tooltip
            title={
              !!cardLengh
                ? `В вашей корзине ${cardLengh} товар${
                    cardLengh > 1 ? "ов" : ""
                  } на сумму ${cardSum} грн`
                : "Ваша корзина пуста"
            }
          >
            <div className={classes.cardBlock} onClick={openCart}>
              <Badge
                className={classes.margin}
                invisible={!cardLengh}
                badgeContent={cardLengh}
                color="primary"
              >
                <ShoppingCart className={classes.icon} />
              </Badge>
              <span className={classes.cardText}>Корзина</span>
            </div>
          </Tooltip>
        </Toolbar>
        <CartWithDialog />
      </div>
    );
  }
}

Panel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Panel));
