import React from "react";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const mapStateToProps = state => {
  const isFemale = state.general.sex == "female";
  if (state.metaData.headers)
    return {
      headers: state.metaData.headers[isFemale ? "female" : "male"]
    };
  return {};
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
    marginTop: 150,
    padding: 15
  },
  link: {
    textDecoration: "none"
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
    const catalogue =
      headers && headers.find
        ? headers.find(header => header.catalogue == category)
        : "";
    const group = catalogue ? catalogue.group : "";
    if (en) return group;
    return mapCategory[group];
  };

  const toMain = e => {
    e.preventDefault();
    redirectToRoot && redirectToRoot();
  };

  const toCategory = (e, search_category) => {
    e.preventDefault();
    requestAndAddProducts({ search_category });
    redirectToRoot && redirectToRoot();
  };

  const toGroup = (e, search_group) => {
    e.preventDefault();
    requestAndAddProducts({ search_group });
    redirectToRoot && redirectToRoot();
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Link to="/" onClick={toMain} className={classes.link}>
          Главная
        </Link>{" "}
        /
        <Link
          to="/"
          onClick={e => toGroup(e, getGroup("en"))}
          className={classes.link}
        >
          {getGroup()}
        </Link>{" "}
        {getGroup() && "/"}
        <Link
          to="/"
          onClick={e => toCategory(e, category)}
          className={classes.link}
        >
          {category}
        </Link>{" "}
        /
        <Link to="/" onClick={e => e.preventDefault()} className={classes.link}>
          {name}
        </Link>
      </Paper>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SimpleBreadcrumbs));
