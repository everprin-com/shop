import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    sex: state.general.sex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sexToFemale: () => dispatch({ type: "SEX_TO_FEMALE" }),
    sexToMale: () => dispatch({ type: "SEX_TO_MALE" })
  };
};

const styles = theme => ({
  menuGenderPanle: {
    display: "flex",
    justifyContent: "space-between"
  },
  maleButton: {
    fontSize: "16px",
    width: "49%",
    background: "#2196f3"
  },
  femaleButton: {
    width: "49%",
    fontSize: "16px",
    background: "#rgb(225, 0, 80)"
  },
  activeSex: {
    width: "80%",
    fontWeight: "bold",
  }
});

function IconLabelButtons(props) {
  const { classes, sexToFemale, sexToMale, sex } = props;
  const isFemale = sex == "female"
  return (
    <div className={classes.menuGenderPanle}>
      <Button
        variant="contained"
        color="secondary"
        className={`${classes.femaleButton} ${isFemale ? classes.activeSex : ""}`}
        onClick={sexToFemale}
      >
        Женщинам
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={`${classes.maleButton} ${isFemale ? "" : classes.activeSex}`}
        onClick={sexToMale}
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
