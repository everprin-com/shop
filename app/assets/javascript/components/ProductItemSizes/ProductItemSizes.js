import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import styles from "./styles";

const mapDispatchToProps = dispatch => {
  return {
    setActiveSize: (id, size) => dispatch({ type: "SET_ACTIVE_SIZE", id, size })
  };
};

class ProductItemSizes extends React.PureComponent {
  render() {
    const {
      classes,
      sizes,
      setActiveSize,
      activeSize,
      id,
      format
    } = this.props;
    if (!sizes || sizes.length < 1 || !sizes.length) return null;
    return (
      <div className={classes.root}>
        <div className={classes.title}>Размер:</div>
        <div className={format ? classes.contentForBig : classes.content}>
          {sizes.map(sizeItem => {
            return (
              <Button
                size={format ? "large" : "small"}
                classes={{ sizeSmall: classes.sizeSmall }}
                variant="outlined"
                className={`${classes.sizeItem} ${
                  activeSize === sizeItem ? classes.active : ""
                }`}
                onClick={() => setActiveSize(id, sizeItem)}
                key={sizeItem}
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
  null,
  mapDispatchToProps
)(withStyles(styles)(ProductItemSizes));
