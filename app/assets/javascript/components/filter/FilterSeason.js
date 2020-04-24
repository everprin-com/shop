import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { connect } from "react-redux";

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

class FilterSeason extends React.PureComponent {
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
            Сезон:{filterValueCount ? `(${filterValueCount})` : null}
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
          {filterOptions.map(season => {
            const isActive =
              filter[keyFilter] && filter[keyFilter].includes(season);
            return (
              <span
                className={`season-item ${isActive ? "active" : ""}`}
                title={season}
                onClick={() => this.handleChange(season)}
                key={season}
              >
                {season}
              </span>
            );
          })}
        </div>
      </FormGroup>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterSeason);
