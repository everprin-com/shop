import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

const styles  = {
  root: {
    color: '#111',
    '&$checked': {
      color: green[500],
    },
    pointerEvents: 'auto',
    magrinTop: 10,
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
  }
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
        <div className={classes.title}>Cезон</div>
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
        </div>
        {/* <Divider className={classes.divider} /> */}
      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);