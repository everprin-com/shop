import React from "react";
import PropTypes from "prop-types";
import FormGroup from "@material-ui/core/FormGroup";
import { connect } from "react-redux";
import "./style";
import colorMap from "../constants/colorMap";
import { isEqualArr } from "../Utils";

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

class FilterColor extends React.PureComponent {
  handleChange = name => {
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

  render() {
    const { filterOptions, filter, keyFilter, addFilter } = this.props;

    if (!filterOptions || !filterOptions.length) return null;
    const filterValueCount = filter[keyFilter] && filter[keyFilter].length;

    return (
      <FormGroup row className="root filter">
        <div className="title">
          <span className="title-text">
            Цвет:{filterValueCount ? `(${filterValueCount})` : null}
          </span>
          {filterValueCount ? (
            <span
              className="title-reset"
              onClick={() => addFilter({ [keyFilter]: [] })}
            >
              Очистить фильтр
            </span>
          ) : null}
        </div>
        <div className="container">
          {filterOptions.map(color => {
            const isActive =
              filter[keyFilter] && filter[keyFilter].includes(color);
            return (
              <span
                className={`color-item ${color} ${isActive ? "active" : ""}`}
                title={colorMap[color] ? colorMap[color] : color}
                onClick={() => this.handleChange(color)}
                key={color}
              ></span>
            );
          })}
        </div>
      </FormGroup>
    );
  }
}

FilterColor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterColor);
