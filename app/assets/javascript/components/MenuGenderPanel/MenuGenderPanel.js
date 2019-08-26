import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "./styles";

const mapStateToProps = state => {
  return {
    sex:
      state.filterData.filter.sex && state.filterData.filter.sex.includes("man")
        ? "man"
        : "wooman"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFilter: filter => dispatch({ type: "ADD_FILTER", filter })
  };
};

function IconLabelButtons(props) {
  const { classes, addFilter, sex, redirectToRoot} = props;
  const isFemale = sex == "wooman";
  return (
    <div className={classes.menuGenderPanle}>
      <Button
        variant="contained"
        color="secondary"
        className={`${classes.femaleButton} ${
          isFemale ? classes.activeSex : ""
        }`}
        onClick={() => {
          addFilter({ sex: ["wooman"] })
          redirectToRoot && redirectToRoot()
        }}
      >
        Женщинам
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={`${classes.maleButton} ${isFemale ? "" : classes.activeSex}`}
        onClick={() => {
          addFilter({ sex: ["man"] })
          redirectToRoot && redirectToRoot()
        }}
      >
        Мужчинам
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(IconLabelButtons));
