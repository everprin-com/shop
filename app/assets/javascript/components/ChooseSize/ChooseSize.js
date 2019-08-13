import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { getSizes } from "../Utils";
import styles from "./styles";

const mapDispatchToProps = dispatch => {
  return {
    setActiveSize: (id, size) =>
      dispatch({ type: "SET_ACTIVE_SIZE", id, size }),
    closeDialog: () => dispatch({ type: "CLOSE_SET_SIZE_WINDOW" }),
    putToCart: product => dispatch({ type: "PUT_TO_CART", product })
  };
};

const mapStateToProps = state => {
  return {
    products: state.product,
    dialog: state.dialog
  };
};

class ChooseSize extends React.PureComponent {
  render() {
    const {
      dialog,
      products,
      setActiveSize,
      classes,
      closeDialog,
      putToCart
    } = this.props;
    const product =
      products.find(product => product.id == dialog.size.id) || {};
    const { size, activeSize, id } = product;
    return (
      <div className={classes.root}>
        <div className={classes.title}>Размеры:</div>
        <div className={classes.content}>
          {size &&
            size.map(sizeItem => {
              return (
                <Button
                  variant="outlined"
                  className={`${classes.sizeItem} ${
                    activeSize === sizeItem ? classes.active : ""
                  }`}
                  onClick={() => {
                    setActiveSize(id, sizeItem);
                    putToCart({ ...product, activeSize: sizeItem });
                    closeDialog();
                  }}
                >
                  {sizeItem}
                </Button>
              );
            })}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChooseSize));
