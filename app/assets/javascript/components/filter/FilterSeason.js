import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

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

class CheckboxLabels extends React.PureComponent {
  state = {
    checkedA: true,
    checkedB: false,
    checkedC: true,
    checkedD: false,
    applayed: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onApplay = () => {
    this.setState({ applayed: !this.state.applayed });
  }

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row className={classes.root}>
        <div className={classes.title}>Выберите сезон</div>
        <div className={classes.container}>
          <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedA}
                  onChange={this.handleChange('checkedA')}
                  value="checkedA"
                  color="secondary"
                />
              }
              label="Весна"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedB}
                onChange={this.handleChange('checkedB')}
                value="checkedB"
                color="primary"
              />
            }
            label="Лето"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedC}
                onChange={this.handleChange('checkedC')}
                value="checkedC"
                color="secondary"
              />
            }
            label="Осень"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedD}
                onChange={this.handleChange('checkedD')}
                value="checkedD"
                color="primary"
              />
            }
            label="Зима"
          />
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

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);