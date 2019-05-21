import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import fetchGetWithParams from "../api/fetchGetWithParams"

const mapDispatchToProps = dispatch => {
    return {
      addFilter: filter => dispatch({ type: 'ADD_FILTER', filter }),
      resetAndAddProducts: products => dispatch({ type: 'RESET_AND_ADD_PRODUCTS', products }),
      requestAndAddProducts: params => dispatch({ type: 'REQUEST_AND_ADD_PRODUCTS', params, afterReset: true}),
    }
  }

const styles  = {
  root: {
    color: '#111',
    '&$checked': {
      color: green[500],
    },
    pointerEvents: 'auto',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    width: '100%',
  },
  container: {
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'center',
  },
  checked: {},
}



class Filter extends React.Component {
  state = {
    search_color: [],
  };

  handleChange = name => event => {
    this.setState({ search_color: [...this.state.search_color, name] });
  };

  onApplay = () => {
    this.props.addFilter({...this.state})
    // fetchGetWithParams("items/", {search_color: this.state.color}, true)
    //   .then(products=> {
    //     this.props.resetAndAddProducts(products);
    //     this.setState({ applayed: !this.state.applayed });
    //   })
  }

  formItem = ({label, value, color}) => {
    return (
          <FormControlLabel
              control={
                <Checkbox
                  checked={this.state[value]}
                  onChange={this.handleChange(value)}
                  value={value}
                  color={color}
                />
              }
              label={label}
          />
    )
}

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row className={classes.root}>
        <div className={classes.title}>Выберите сезон</div>
        <div className={classes.container}>
        {this.formItem({label:"Зеленый", value:"Зеленый", color:"secondary"})}
        {this.formItem({label:"Синий", value:"Синий", color:"secondary"})}
        {this.formItem({label:"Красный", value:"Красный", color:"secondary"})}
        {this.formItem({label:"Черный", value:"Черный", color:"secondary"})}
        {this.formItem({label:"Белый", value:"Белый", color:"secondary"})}
          <Button
            variant={this.state.applayed ? "contained" : "outlined"}
            color="primary"
            onClick={this.onApplay}>
            Применить
          </Button>
        </div>
      </FormGroup>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Filter))