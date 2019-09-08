import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "./styles";

const mapStateToProps = state => {
  return {
    filter: state.filterData.filter ? state.filterData.filter : {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetAndAddProducts: products =>
      dispatch({ type: "RESET_AND_ADD_PRODUCTS", products }),
    requestAndAddProducts: params =>
      dispatch({ type: "REQUEST_AND_ADD_PRODUCTS", params, afterReset: true }),
    addFilter: filter => dispatch({ type: "ADD_FILTER", filter })
  };
};

function RangePrice({
  classes,
  min,
  max,
  title,
  priceMax,
  priceMin,
  filter,
  color = "primary",
  handleChange
}) {
  const shouldRenderRange =
    (priceMin < min && priceMax > min) || (priceMin < max && priceMax > max);
  if (!shouldRenderRange) return null;
  return (
    <div className={classes.option}>
      <FormControlLabel
        key={title}
        control={
          <Checkbox
            checked={
              filter.price_search
                ? filter.price_search.some(
                    filterPirceItem => filterPirceItem.from == min
                  )
                : false
            }
            onChange={() => handleChange({ from: min, to: max })}
            value={title}
            color={color}
            className={classes.checkbox}
          />
        }
        label={<span className={classes.label}>{title}</span>}
      />
    </div>
  );
}

class FilterPrice extends React.PureComponent {
  state = { currentFilterPriceItem: {}, inputValue: [] };

  handleChange = (currentFilterPriceItem, input) => {
    const { filter, addFilter } = this.props;
    if (
      !input &&
      filter.price_search &&
      filter.price_search.some(
        filterPirceItem => filterPirceItem.from == currentFilterPriceItem.from
      )
    ) {
      addFilter({
        price_search: filter.price_search.filter(
          filterPirceItem => filterPirceItem.from != currentFilterPriceItem.from
        )
      });
    } else {
      if (filter.price_search && !input) {
        addFilter({
          price_search: [...filter.price_search, currentFilterPriceItem]
        });
      } else if (filter.price_search && input) {
        let {
          currentFilterPriceItem,
          inputValue: [from = 0, to = 9999]
        } = this.state;
        let indexCurrentFilterPriceItem;
        filter.price_search.forEach((item, index) => {
          if (
            item.from == currentFilterPriceItem.from &&
            item.to == currentFilterPriceItem.to
          ) {
            indexCurrentFilterPriceItem = index;
          }
        });

        const newFilterPriceItem = { from, to };

        let newArr = [...filter.price_search];
        if (!indexCurrentFilterPriceItem) {
          newArr.push(newFilterPriceItem);
        } else {
          newArr[indexCurrentFilterPriceItem] = newFilterPriceItem;
        }
        addFilter({ price_search: newArr });
        this.setState({ currentFilterPriceItem: newFilterPriceItem });
      } else {
        addFilter({ price_search: [currentFilterPriceItem] });
        if (input) this.setState({ currentFilterPriceItem });
      }
    }
  };

  onChangeFromSlider = value => {
    this.setState({
      inputValue: value
    });
  };

  onChangeFromInput = (e, n) => {
    const value = e.target.value
    if (Number.isNaN(value)) {
      return;
    }
    let newInputValue = [...this.state.inputValue];
    newInputValue[n] = +value;
    this.setState({ inputValue: newInputValue }, () => {
      const [from = 0, to = 9999] = this.state.inputValue;
      let searchQuery = { from, to };
      if (value < 40 || from > to) return;
      this.handleChange(searchQuery, true);
    });
  };

  rangePriceGenerator = arr => {
    const { classes, priceMin, priceMax, filter } = this.props;
    return arr.map(({ min, max, title }) => {
      return (
        <RangePrice
          classes={classes}
          min={min}
          max={max}
          priceMin={priceMin}
          priceMax={priceMax}
          title={title}
          active={this.state.active}
          filter={filter}
          handleChange={this.handleChange}
        />
      );
    });
  };

  render() {
    const { inputValue = [] } = this.state;
    const { classes, addFilter } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <span className={classes.titleText}>Цена:</span>
          <span
            className={classes.titleReset}
            onClick={() => addFilter({ price_search: [] })}
          >
            Очистить фильтр
          </span>
        </div>
        <div className={classes.contentWrap}>
          <div className={classes.inputWrap}>
            <span className={classes.fromTo}>От</span>
            <input
              type="number"
              min={1}
              max={5000}
              style={{ marginLeft: 16 }}
              value={inputValue[0]}
              className={`${classes.inputLeft} ${classes.inputNumber}`}
              onChange={e => {
                this.onChangeFromInput(e, 0);
              }}
            />
            <span className={classes.fromTo}>До</span>
            <input
              type="number"
              min={1}
              max={5000}
              style={{ marginLeft: 16 }}
              value={inputValue[1]}
              className={`${classes.inputRight} ${classes.inputNumber}`}
              onChange={e => {
                this.onChangeFromInput(e, 1);
              }}
            />
          </div>
          {this.rangePriceGenerator([
            { min: 0, max: 300, title: "До 300 грн" },
            { min: 300, max: 500, title: "300 - 500 грн" },
            { min: 500, max: 800, title: "500 - 800 грн" },
            { min: 800, max: 1000, title: "800 - 1000 грн" },
            { min: 1000, max: 1500, title: "От 1000 до 1500 грн" },
            { min: 1500, max: 2000, title: "От 1500 до 2000 грн" },
            { min: 2000, max: 9999, title: "От 2000 грн" }
          ])}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterPrice));
