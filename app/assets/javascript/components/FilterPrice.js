import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from 'rc-slider';

const Range = Slider.Range;

const styles  = {
  root: {
    pointerEvents: 'auto', 
    width: '200px',
    height: '100px',
    padding: '10px 0',
    textAlign: 'center',
  },
  inputLeft: {
    marginLeft: '0 !important',
  },
  inputRight: {
    marginLeft: '4px !important',
  },
  slider: {
    margin: '10px 0 5px',
  }
}

class FilterPrice extends React.Component {
  state = {
    applayed: false,
    inputValue: [0,10],
  };

  onApplay = () => {
    this.setState({ applayed: !this.state.applayed });
  }
  
  onChangeFromSlider = (value) => {
    this.setState({
      inputValue: value,
    });
  }

  onChangeFromInput = (value, n) => {
    if (Number.isNaN(value)) {
      return;
    }
    let newInputValue = [...this.state.inputValue]
    newInputValue[n] = +value
    this.setState({ inputValue: newInputValue });
  }

  render() {
    const { inputValue } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <InputNumber
            min={1}
            max={100}
            style={{ marginLeft: 16 }}
            value={inputValue[0]}
            className={classes.inputLeft}
            onChange={(value)=>{this.onChangeFromInput(value, 0)}}
        />
        <InputNumber
            min={1}
            max={100}
            style={{ marginLeft: 16 }}
            value={inputValue[1]}
            className={classes.inputRight}
            onChange={(value)=>{this.onChangeFromInput(value, 1)}}
        />
        <Range allowCross={false} value={inputValue} className={classes.slider} onChange={this.onChangeFromSlider} />
        <Button
          variant={this.state.applayed ? "contained" : "outlined"}
          color="primary"
          onClick={this.onApplay}>
          Применить
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(FilterPrice)
