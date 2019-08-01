import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "rc-slider";
import { connect } from "react-redux";
// import Divider from '@material-ui/core/Divider';
import { InputNumber } from "antd";

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
    padding: "10px 0",
    textAlign: "center",
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
    padding: "5px 0"
  },
  divider: {
    width: "100%",
    backgroundColor: `rgba(0, 0, 0, 0.2)`
  },
  inputWrap: {
    margin: '10px 0',
  },
  fromTo: {
    margin: '0 5px',
  }
};
function RangePrice({ classes, onApplay, min, max, title, active }) {
  const isActive = active === `${min}-${max}` || false;
  return (
    <div
      className={`${classes.range} ${isActive ? classes.activeRange : ""}`}
      onClick={() => onApplay(min, max)}
    >
      {title}
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
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.title}>Цена</div>
        <div className={classes.inputWrap}>
          <span className={classes.fromTo}>
            От
          </span>
          <InputNumber
            min={1}
            max={5000}
            style={{ marginLeft: 16 }}
            value={inputValue[0]}
            className={classes.inputLeft}
            onChange={value => {
              this.onChangeFromInput(value, 0);
            }}
          />
          <span className={classes.fromTo}>
            До
          </span>
          <InputNumber
            min={1}
            max={5000}
            style={{ marginLeft: 16 }}
            value={inputValue[1]}
            className={classes.inputRight}
            onChange={value => {
              this.onChangeFromInput(value, 1);
            }}
          />
        </div>
        {/* <Range allowCross={false} value={inputValue} className={classes.slider} onChange={this.onChangeFromSlider} /> */}
        <RangePrice
          classes={classes}
          onApplay={this.onApplay}
          min={0}
          max={300}
          title="До 300 грн"
          active={this.state.active}
        />
        <RangePrice
          classes={classes}
          onApplay={this.onApplay}
          min={300}
          max={500}
          title="300 - 500 грн"
          active={this.state.active}
        />
        <RangePrice
          classes={classes}
          onApplay={this.onApplay}
          min={500}
          max={800}
          title="500 - 800 грн"
          active={this.state.active}
        />
        <RangePrice
          classes={classes}
          onApplay={this.onApplay}
          min={800}
          max={9999}
          title="От 800 грн"
          active={this.state.active}
        />
        {/* <Divider className={classes.divider} /> */}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(FilterPrice));
