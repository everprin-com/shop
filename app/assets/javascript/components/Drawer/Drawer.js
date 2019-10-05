import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/icons/Menu";
import SideBar from "../SideBar/SideBar";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "./styles";

// const mapStateToProps = state => {
//   return {
//     sideBarOpen: state.general.mobileSideBar
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     openSideBar: () => dispatch({ type: "MOBILE_SIDEBAR_ON" }),
//     closeSideBar: () => dispatch({ type: "MOBILE_SIDEBAR_OFF" })
//   };
// };

class SwipeableTemporaryDrawer extends React.PureComponent {
  state = { open: false };
  openSideBar = () => {
    this.setState({ open: true });
    // this.props.openSideBar();
  };
  closeSideBar = () => {
    this.setState({ open: false });
    // this.props.closeSideBar();
  };
  render() {
    const {
      props: { classes, sideBarOpen, openSideBar, closeSideBar, mainPageHeader }
    } = this;
    const { open } = this.state;
    return (
      <div className={classes.smallMenu}>
        <Button className={classes.button} onClick={this.openSideBar}>
          <Menu className={classes.icon} />
        </Button>
        <SwipeableDrawer
          open={open || sideBarOpen ? true : false}
          onClose={this.closeSideBar}
          onOpen={openSideBar}
          className={classes.sideBarWrap}
          classes={{
            paper: classes.sideBarWrap
          }}
        >
          <SideBar showSideBarPanel={mainPageHeader} />
        </SwipeableDrawer>
      </div>
    );
  }
}

// export default withStyles(styles)(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(SwipeableTemporaryDrawer)
// );
export default withStyles(styles)(SwipeableTemporaryDrawer)