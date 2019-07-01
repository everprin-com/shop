import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';


const mapDispatchToProps = dispatch => {
  return {
    addFilter: filter => dispatch({ type: 'ADD_FILTER', filter }),
  }
}

const styles  = {
  root: {
    color: '#111',
    width: '100%',
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
}

class FilterGeneral extends React.PureComponent {
  state={[`search_${this.props.type}`]: []}

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  }

  handleChange = name => event => {
      const { type, addFilter } = this.props
      if (this.state[`search_${type}`].includes(name)) {

        this.setState({
         [`search_${type}`]: [...this.state[`search_${type}`].filter(color => color !== name)]
      }, () => { addFilter({...this.state}) })
      } else {
          this.setState({ [`search_${type}`]: [...this.state[`search_${type}`], name]
          }, () => { addFilter({...this.state}) });
        }
  }

  generateFilterItem = ({label, color="primary"}) => {
    return (
          <FormControlLabel
              key={label}
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
    const { classes, filterOptions, title } = this.props;

    if (!filterOptions) return null

    return (
      <FormGroup row className={classes.root}>
        <div className={classes.title}>
            {title}
        </div>
        <div className={classes.container}>
            {filterOptions.map(filterItem => this.generateFilterItem({ label: filterItem }))}
        </div>
        {/* <Divider className={classes.divider} /> */}
      </FormGroup>
    );
  }
}

FilterGeneral.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(FilterGeneral));