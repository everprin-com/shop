import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Cart from "./Cart";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import styles from "./styles";

const mapStateToProps = state => {
  return {
    card: state.card
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeCart: () => dispatch({ type: "CLOSE_CART" })
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

function CartWithDialog({ card = {}, closeCart, classes = {}, orderForm }) {
  return (
    <Dialog
      onClose={closeCart}
      aria-labelledby="customized-dialog-title"
      open={card.isOpen}
      className={orderForm ? classes.dialogOrderForm : classes.dialog}
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
      <MuiDialogContent className={classes.dialogContent}>
        <Cart orderForm={orderForm} />
      </MuiDialogContent>
    </Dialog>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CartWithDialog));
