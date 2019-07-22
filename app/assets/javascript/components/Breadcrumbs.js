import React from "react";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    headers: state.metaData.headers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestAndAddProducts: params =>
      dispatch({ type: "REQUEST_AND_ADD_PRODUCTS", params, afterReset: true })
  };
};

const styles = () => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 150
  }
});

function SimpleBreadcrumbs({
  classes,
  category,
  name,
  headers,
  redirectToRoot,
  requestAndAddProducts
}) {
  var mapCategory = {
    footwear: "Обувь",
    clothes: "Одежда",
    accessories: "Аксессуары"
  };
  const getGroup = en => {
    const catalogue = headers
      ? headers.find(header => header.catalogue == category)
      : "";
    const group = catalogue ? catalogue.group : "";
    if (en) return group
    return mapCategory[group]
  };

  const toMain = e => {
    e.preventDefault();
    redirectToRoot && redirectToRoot();
  };

  const toCategory = (e, search_category) => {
    e.preventDefault();
    requestAndAddProducts({ search_category });
    redirectToRoot && redirectToRoot();
  }

  const toGroup = (e, search_group) => {
    e.preventDefault();
    requestAndAddProducts({ search_group });
    // redirectToRoot && redirectToRoot();
  }

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Link to="/" onClick={toMain}>
          Главная
        </Link>{" "}
        /<Link to="/" onClick={e => toGroup(e, getGroup("en"))}>{getGroup()}</Link> /
        <Link to="/" onClick={e => toCategory(e, category)}>
          {category}
        </Link>{" "}
        /<Link to="/">{name}</Link>
      </Paper>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SimpleBreadcrumbs));
