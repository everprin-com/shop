import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import TableS from "./TableS";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "./styles";
import tablesSize from "./TablesSimple";

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

class TableSize extends React.PureComponent {
  render() {
    const {
      props: {
        classes,
        tableSizeOpen,
        openTableSize,
        closeTableSize,
        data,
        dropShip,
        simple,
        sex,
        group,
      }
    } = this;
    const  isMan = sex && sex.includes("man")
    const getTableSimple = () => {
      if (group == "clothes") {
        return tablesSize.clothes[isMan ? "man" : "wooman"]
      }
      if (group == "footwear")
      return  tablesSize.footwear
    }
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
          {simple ? getTableSimple() : <TableS data={data} dropShip={dropShip} />}
        </SwipeableDrawer>
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TableSize)
);
