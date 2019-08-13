import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Input from "../Input/Input";
import Tooltip from "../Tooltip/Tooltip";
import { ShoppingCart } from "@material-ui/icons";
import Cart from "../Cart/Cart";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
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

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    maxWidth: 900,
    minWidth: 700
  }
}))(MuiDialogContent);

class Panel extends React.PureComponent {
  render() {
    const { classes, card, closeCart, openCart } = this.props;
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
        <Dialog
          onClose={closeCart}
          aria-labelledby="customized-dialog-title"
          open={card.isOpen}
          className={classes.dialog}
          maxWidth="lg"
          classes={{
            paper: classes.paper
          }}
        >
          <DialogTitle className={classes.cardTitleBlock} onClose={closeCart}>
            <div className={classes.cardTitle}>Корзина</div>
            {card.withProduct && (
              <div className={classes.addedProduct}>
                Вы добавили товар в корзину
              </div>
            )}
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Cart />
          </DialogContent>
        </Dialog>
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