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
import categories from '../constants/categories'

const mapDispatchToProps = dispatch => {
    return {
      addFilter: filter => dispatch({ type: 'ADD_FILTER', filter }),
      resetAndAddProducts: products => dispatch({ type: 'RESET_AND_ADD_PRODUCTS', products }),
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
    background: '#eef',
    fontWeight: 'bold',
    padding: 5,
  },
  container: {
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'center',
  },
  checked: {},
}



class Filter extends React.PureComponent {
  state = {
    search_category: [],
  };

  handleChange = name => event => {
    this.setState({ search_category: [...this.state.search_category, name] });
  };

  onApplay = () => {
    this.props.addFilter({...this.state})
    // fetchGetWithParams("items/", {search_category: this.state.search_category}, true)
    //   .then(products=> {
    //     this.props.resetAndAddProducts(products);
    //     this.setState({ applayed: !this.state.applayed });
    //   })
  }

  formItem = ({label, color}) => {
    return (
          <FormControlLabel
              control={
                <Checkbox
                  checked={this.state[label]}
                  onChange={this.handleChange(label)}
                  value={label}
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
        {categories.map(category => this.formItem({label: category, color:"primary"}))}
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
