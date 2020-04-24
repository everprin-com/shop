import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FilterSex from "../filter/FilterSex";
import FilterPrice from "../filter/FilterPrice";
import FilterGeneral from "../filter/FilterGeneral";
import FilterColor from "../filter/FilterColor";
import FilterSeason from "../filter/FilterSeason";
import FilterSize from "../filter/FilterSize";
import { connect } from "react-redux";
import styles from "./styles";
import SideBarPanel from "./SideBarPanel";

const mapStateToProps = state => {
  const isFemale =
    state.filterData.filter.sex &&
    state.filterData.filter.sex.includes("wooman");
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
      categories,
      showSideBarPanel
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
        {showSideBarPanel ? (
          <SideBarPanel />
        ) : (
          <div>
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
              <FilterSize
                title="Размеры"
                keyFilter="search_size"
                filterOptions={filterOptions.size}
              />
            </ListItem>

            <ListItem className={classes.item}>
              <FilterColor
                title="Цвета"
                keyFilter="search_color"
                filterOptions={filterOptions.color}
              />
            </ListItem>

            <ListItem className={classes.item}>
              <FilterSeason
                title="Сезон"
                keyFilter="season"
                filterOptions={filterOptions.season}
              />
            </ListItem>
          </div>
        )}
      </List>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(SideBar));
