import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import { connect } from "react-redux";
import styles from "./styles";

const mapDispatchToProps = dispatch => {
  return {
    setActiveSize: (id, size) => dispatch({ type: "SET_ACTIVE_SIZE", id, size })
  };
};

function Sizes(props) {
  const {
    classes,
    sizes,
    activeSize,
    setActiveSize,
    productId,
    helpSetActiveSize
  } = props;
  return (
    <div className={classes.root}>
      {sizes.map(sizeItem => {
        return (
          <Chip
            label={sizeItem}
            onClick={() => {
              setActiveSize(productId, sizeItem);
              helpSetActiveSize();
            }}
            className={`${classes.chipBig} ${
              activeSize === sizeItem ? classes.active : ""
            }`}
            variant="outlined"
          />
        );
      })}
    </div>
  );
}

Sizes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Sizes));
