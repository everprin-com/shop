import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    addFilter: filter => dispatch({ type: "ADD_FILTER", filter })
  };
};

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
  divider: {
    width: '100%',
    backgroundColor: `rgba(0, 0, 0, 0.2)`
  },
  label: {
    marginRight: 10
  },
  checkbox:{
    padding: 4
  }
}

class CheckboxLabels extends React.PureComponent {
  state = {
    female: true,
    male: false,
  };

  handleChange = name => event => {
    this.setState(
      { [name]: event.target.checked },
      () => this.props.addFilter({male: this.state.male})
      );
  };

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row className={classes.root}>
        <div className={classes.title}>Пол</div>
        <div className={classes.container}>
          <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.female}
                  onChange={this.handleChange('female')}
                  value="female"
                  className={classes.checkbox}
                />
              }
              label="Женский"
              className={classes.label}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.male}
                onChange={this.handleChange('male')}
                value="male"
                color="primary"
                className={classes.checkbox}
              />
            }
            label="Мужской"
            className={classes.label}
          />
        </div>
        {/* <Divider className={classes.divider} /> */}
      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(CheckboxLabels))