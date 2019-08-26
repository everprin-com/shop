import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import TableS from "./TableS";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "./styles";

const mapStateToProps = state => {
  return {
    tableSizeOpen: state.general.tableSize
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openTableSize: () => dispatch({ type: "TABLE_SIZE_ON" }),
    closeTableSize: () => dispatch({ type: "TABLE_SIZE_OFF" })
  };
};

class SwipeableTemporaryDrawer extends React.PureComponent {
  render() {
    const {
      props: { classes, tableSizeOpen, openTableSize, closeTableSize, data }
    } = this;
    return (
      <div>
        <SwipeableDrawer
          open={tableSizeOpen}
          onClose={closeTableSize}
          onOpen={openTableSize}
          className={classes.sideBarWrap}
          anchor="right"
          classes={{
            paper: classes.sideBarWrap
          }}
        >
          <TableS data={data} />
        </SwipeableDrawer>
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SwipeableTemporaryDrawer)
);
