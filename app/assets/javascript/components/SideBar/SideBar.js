import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FilterSex from "../filter/FilterSex";
import FilterPrice from "../filter/FilterPrice";
import FilterGeneral from "../filter/FilterGeneral";
import { connect } from "react-redux";
import styles from "./styles";

const mapStateToProps = state => {
  const isFemale = state.general.sex == "female";
  if (state.metaData.headers) {
    return {
      categories: state.metaData.headers[isFemale ? "female" : "male"].map(
        i => i.catalogue
      ),
      filterOptions: state.filterData.filterOptions
    };
  }
  return {
    filterOptions: state.filterData.filterOptions
  };
};

class SideBar extends React.PureComponent {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const {
      classes,
      isMainSideBar,
      filterOptions = {},
      categories
    } = this.props;

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
            keyFilter="search_brand"
            style={{ maxHeight: "130px", overflowY: "auto", width: "100%" }}
            filterOptions={filterOptions.brand}
            isList
          />
        </ListItem>

        <ListItem className={classes.item}>
          <FilterSex />
        </ListItem>

        <ListItem className={classes.item}>
          <FilterPrice
            priceMin={filterOptions.price_min}
            priceMax={filterOptions.price_max}
          />
        </ListItem>

        <ListItem className={classes.item}>
          <FilterGeneral
            title="Размеры"
            keyFilter="search_size"
            style={{ maxHeight: "130px", width: "100%", overflowY: "auto" }}
            filterOptions={filterOptions.size}
            isList
          />
        </ListItem>

        <ListItem className={classes.item}>
          <FilterGeneral
            title="Категории"
            keyFilter="search_category"
            style={{ maxHeight: "130px", overflowY: "auto" }}
            filterOptions={categories}
            isList
          />
        </ListItem>
      </List>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(SideBar));