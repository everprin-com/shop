import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
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

class CheckboxLabels extends React.PureComponent {
  render() {
    const { classes, sex, addFilter } = this.props;
    const isWooman = sex == "wooman";
    return (
      <FormGroup row className={classes.root}>
        <div className={classes.title}>Пол:</div>
        <div className={classes.container}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isWooman}
                onChange={() => addFilter({ sex: ["wooman"] })}
                value="female"
                className={classes.checkbox}
              />
            }
            label={<span className={classes.label}>Женский</span>}
            className={classes.label}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!isWooman}
                onChange={() => addFilter({ sex: ["man"] })}
                value="dmale"
                color="primary"
                className={classes.checkbox}
              />
            }
            label={<span className={classes.label}>Мужской</span>}
            className={classes.label}
          />
        </div>
      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CheckboxLabels));
