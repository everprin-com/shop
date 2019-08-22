import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "rc-slider";
import { connect } from "react-redux";
// import Divider from '@material-ui/core/Divider';
import { InputNumber } from "antd";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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

const Range = Slider.Range;

const styles = {
  root: {
    pointerEvents: "auto",
    width: "100%",
    padding: "10px",
    // textAlign: "center",
    magrinTop: 10
  },
  inputLeft: {
    marginLeft: "0 !important"
  },
  inputRight: {
    marginLeft: "4px !important"
  },
  slider: {
    margin: "10px 0 5px"
  },
  range: {
    cursor: "pointer"
  },
  activeRange: {
    fontWeight: "bold"
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    width: "100%",
    background: "#eef",
    fontWeight: "bold",
    padding: 5
  },
  container: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10
  },
  checkbox: {
    padding: 0
  },
  list: {
    paddingLeft: 10,
    display: "block",
    width: "100%"
  },
  label: {
    fontSize: `15px`
  },
  divider: {
    width: "100%",
    backgroundColor: `rgba(0, 0, 0, 0.2)`
  },
  inputWrap: {
    margin: "10px 0",
    fontSize: 17
  },
  fromTo: {
    margin: "0 4px"
  },
  inputNumber: {
    width: 70
  }
};

function RangePrice({
  classes,
  onApplay,
  min,
  max,
  title,
  active,
  priceMax,
  priceMin,
  filter,
  color = "primary",
  handleChange
}) {
  const isActive = active === `${min}-${max}` || false;
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
  state = { active: null, inputValue: [] };

  onApplay = (from, to) => {
    this.setState({ active: `${from}-${to}` });
    this.props.addFilter({
      price_search_from: from,
      price_search_to: to
    });
  };

  handleChange = curremtFilterPriceItem => {
    const { filter, addFilter } = this.props;
    if (
      filter.price_search &&
      filter.price_search.some(
        filterPirceItem => filterPirceItem.from == curremtFilterPriceItem.from
      )
    ) {
      addFilter({
        price_search: filter.price_search.filter(
          filterPirceItem => filterPirceItem.from != curremtFilterPriceItem.from
        )
      });
    } else {
      if (filter.price_search) {
        addFilter({
          price_search: [...filter.price_search, curremtFilterPriceItem]
        });
      } else {
        addFilter({ price_search: [curremtFilterPriceItem] });
      }
    }
  };

  onChangeFromSlider = value => {
    this.setState({
      inputValue: value
    });
  };

  onChangeFromInput = (value, n) => {
    if (Number.isNaN(value)) {
      return;
    }
    let newInputValue = [...this.state.inputValue];
    newInputValue[n] = +value;
    this.setState({ inputValue: newInputValue }, () => {
      const [price_search_from, price_search_to] = this.state.inputValue;
      let searchQuery =
        price_search_from && price_search_to
          ? { price_search_from, price_search_to }
          : price_search_from
          ? { price_search_from }
          : { price_search_to };
      this.props.addFilter(searchQuery);
    });
  };

  render() {
    const { inputValue = [] } = this.state;
    const { classes, priceMin, priceMax, filter } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.title}>Цена</div>
        {/* <div className={classes.inputWrap}>
          <span className={classes.fromTo}>От</span>
          <InputNumber
            min={1}
            max={5000}
            style={{ marginLeft: 16 }}
            value={inputValue[0]}
            className={`${classes.inputLeft} ${classes.inputNumber}`}
            onChange={value => {
              this.onChangeFromInput(value, 0);
            }}
          />
          <span className={classes.fromTo}>До</span>
          <InputNumber
            min={1}
            max={5000}
            style={{ marginLeft: 16 }}
            value={inputValue[1]}
            className={`${classes.inputRight} ${classes.inputNumber}`}
            onChange={value => {
              this.onChangeFromInput(value, 1);
            }}
          />
        </div> */}
        {/* <Range allowCross={false} value={inputValue} className={classes.slider} onChange={this.onChangeFromSlider} /> */}
        <RangePrice
          classes={classes}
          onApplay={this.onApplay}
          min={0}
          max={300}
          priceMin={priceMin}
          priceMax={priceMax}
          title="До 300 грн"
          active={this.state.active}
          filter={filter}
          handleChange={this.handleChange}
        />
        <RangePrice
          classes={classes}
          onApplay={this.onApplay}
          min={300}
          max={500}
          priceMin={priceMin}
          priceMax={priceMax}
          title="300 - 500 грн"
          active={this.state.active}
          filter={filter}
          handleChange={this.handleChange}
        />
        <RangePrice
          classes={classes}
          onApplay={this.onApplay}
          min={500}
          max={800}
          priceMin={priceMin}
          priceMax={priceMax}
          title="500 - 800 грн"
          active={this.state.active}
          filter={filter}
          handleChange={this.handleChange}
        />
        <RangePrice
          classes={classes}
          onApplay={this.onApplay}
          min={800}
          max={1000}
          priceMin={priceMin}
          priceMax={priceMax}
          title="От 800 до 1000 грн"
          active={this.state.active}
          filter={filter}
          handleChange={this.handleChange}
        />
        <RangePrice
          classes={classes}
          onApplay={this.onApplay}
          min={1000}
          max={1500}
          priceMin={priceMin}
          priceMax={priceMax}
          title="От 1000 до 1500 грн"
          active={this.state.active}
          filter={filter}
          handleChange={this.handleChange}
        />
        <RangePrice
          classes={classes}
          onApplay={this.onApplay}
          min={1500}
          max={2000}
          priceMin={priceMin}
          priceMax={priceMax}
          title="От 1500 до 2000 грн"
          active={this.state.active}
          filter={filter}
          handleChange={this.handleChange}
        />
        <RangePrice
          classes={classes}
          onApplay={this.onApplay}
          min={2000}
          max={9999}
          priceMin={priceMin}
          priceMax={priceMax}
          title="От 2000 грн"
          active={this.state.active}
          filter={filter}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterPrice));
