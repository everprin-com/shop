import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import SomeFilter from "./filter/SomeFilter";
import FilterPrice from "./filter/FilterPrice";
import FilterGeneral from "./filter/FilterGeneral";
import { connect } from "react-redux";
import categories from "./constants/categories";

const mapStateToProps = state => {
  return {
    filterOptions: state.filterData.filterOptions
  };
};

const styles = theme => ({
  root: {
    position: "fixed",
    marginTop: 100,
    width: "100%",
    maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
    display: "inline-block",
    zIndex: 2
  },
  mainSideBar: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  smallSideBar: {
    width: 265,
    marginTop: 0,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  item: {
    padding: 0
  }
});

class SideBar extends React.PureComponent {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, isMainSideBar, filterOptions = {} } = this.props;

    return (
      <List
        component="nav"
        className={
          isMainSideBar
            ? `${classes.root} ${classes.mainSideBar}`
            : `${classes.root} ${classes.smallSideBar}`
        }
      >
        <ListItem className={classes.item}>
          <FilterGeneral
            title="Бренды"
            type="brand"
            style={{ maxHeight: "130px", overflowY: "auto", width: "100%" }}
            filterOptions={filterOptions.brand}
            isList
          />
        </ListItem>

        <ListItem className={classes.item}>
          <SomeFilter />
        </ListItem>

        {/* <ListItem className={classes.item}>
          <FilterSeason />
        </ListItem> */}

        <ListItem className={classes.item}>
          <FilterPrice filterOptions={filterOptions.size} />
        </ListItem>

        <ListItem className={classes.item}>
          <FilterGeneral
            title="Размеры"
            type="size"
            style={{ maxHeight: "130px", overflowY: "auto" }}
            filterOptions={filterOptions.size}
          />
        </ListItem>

        <ListItem className={classes.item}>
          <FilterGeneral
            title="Категории"
            type="category"
            style={{ maxHeight: "130px", overflowY: "auto" }}
            filterOptions={categories}
            isList
          />
        </ListItem>

        {/* <ListItem onClick={this.handleClick} className={classes.item}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Inbox" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem> */}

        {/* <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.nested} className={classes.item}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>
        </Collapse> */}
      </List>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(SideBar));
