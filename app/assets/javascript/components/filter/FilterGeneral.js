import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import styles from "./styles"

const mapDispatchToProps = dispatch => {
  return {
    addFilter: filter => dispatch({ type: "ADD_FILTER", filter })
  };
};

const mapStateToProps = state => {
  return {
    filter: state.filterData.filter ? state.filterData.filter : {}
  };
};

class FilterGeneral extends React.PureComponent {
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChange = name => event => {
    const { addFilter, keyFilter, filter } = this.props;
    if (filter[keyFilter] && filter[keyFilter].includes(name)) {
      addFilter({
        [keyFilter]: filter[keyFilter].filter(item => item !== name)
      });
    } else {
      if (filter[keyFilter]) {
        addFilter({ [keyFilter]: [...filter[keyFilter], name] });
      } else {
        addFilter({ [keyFilter]: [name] });
      }
    }
  };

  generateFilterItem = ({ label, color = "primary" }) => {
    const { classes, keyFilter, filter, withMap } = this.props;
    return (
      <div className={classes.option} key={label}>
        <FormControlLabel
          key={label}
          control={
            <Checkbox
              checked={
                filter[keyFilter] ? filter[keyFilter].includes(label) : false
              }
              onChange={this.handleChange(label)}
              value={label}
              color={color}
              className={classes.checkbox}
            />
          }
          label={
            <span className={classes.label}>
              {withMap && withMap[label] ? withMap[label] : label}
            </span>
          }
        />
      </div>
    );
  };

  render() {
    const {
      classes,
      filterOptions,
      title,
      isList,
      style,
      addFilter,
      keyFilter
    } = this.props;

    if (!filterOptions || !filterOptions.length ) return null;

    return (
      <FormGroup row className={classes.root}>
        <div className={classes.title}>
        <span className={classes.titleText}>{title}:</span>
        <span
          className={classes.titleReset}
          onClick={() => addFilter({ [keyFilter]: [] })}
        >
          Очистить фильтр
        </span>
        </div>
     
        <div
          className={`${classes.container} ${isList ? classes.list : ""}`}
          style={{ ...style }}
        >
          {filterOptions
            .sort()
            .map(filterItem => this.generateFilterItem({ label: filterItem }))}
        </div>
      </FormGroup>
    );
  }
}

FilterGeneral.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FilterGeneral)
);
