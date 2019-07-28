import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/icons/Menu";
import SideBar from "./SideBar";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    sideBarOpen: state.general.mobileSideBar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openSideBar: () => dispatch({ type: "MOBILE_SIDEBAR_ON" }),
    closeSideBar: () => dispatch({ type: "MOBILE_SIDEBAR_OFF" })
  };
};

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  icon: {
    fontSize: 35
  },
  smallMenu: {
    position: "absolute",
    bottom: "-56px",
    left: 0,
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  button: {
    minWidth: 50,
    background: "#eee"
  },
  sideBarWrap: {
    width: 265
  }
});

class SwipeableTemporaryDrawer extends React.PureComponent {
  render() {
    const {
      props: { classes, sideBarOpen, openSideBar, closeSideBar }
    } = this;
    return (
      <div className={classes.smallMenu}>
        <Button className={classes.button} onClick={openSideBar}>
          <Menu className={classes.icon} />
        </Button>
        <SwipeableDrawer
          open={sideBarOpen}
          onClose={closeSideBar}
          onOpen={openSideBar}
          className={classes.sideBarWrap}
          classes={{
            paper: classes.sideBarWrap
          }}
        >
          <SideBar />
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
