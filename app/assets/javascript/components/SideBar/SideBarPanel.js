import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

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

class SideBarPanel extends React.PureComponent {
  render() {
    const { categories, classes } = this.props;
    return (
      <div>
        {categories &&
          categories.sort().map(category => (
            <Link
              key={category}
              className={classes.link}
              to={`categoryPage/${category}`}
            >
              <ListItem className={classes.sideBarPanelItem}>
                {category}
              </ListItem>
            </Link>
          ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(SideBarPanel));
