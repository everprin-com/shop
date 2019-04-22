import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chipBig: {
    borderRadius: 4,
    minWidth: 50,
    width: 'auto',
    fontSize: 16,
    padding: '0 8px',
    borderWidth: 0,
    lineHeight: '40px',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.24), 0 1px 1px 0 rgba(0,0,0,0.08)',
    margin: 1,
    '&:hover': {
      backgroundColor: "#2C9925 !important",
      color: "eee",
    },
  },
  chipSmall: {
    display: 'inline-block',
    verticalAlign: 'top',
    lineHeight: '18px',
    minWidth: 'auto',
    width: 'auto',
    padding: '0 6px',
    margin: '0 8px 8px 0',
    '&:hover': {
      backgroundColor: "#2C9925 !important",
      color: "eee",
    },
},
label:{
  padding: 0,
  color:'red'
}
  })
  
function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function OutlinedChips(props) {
  const { classes, small = false } = props;
  return (
    <div className={classes.root}>
      <Chip
        label='42'
        labelStyle={classes.label}
        onClick={handleClick}
        className={ classes.chipBig }
        variant="outlined"
      />
         <Chip
        label="43"
        onClick={handleClick}
        className={classes.chipBig }
        variant="outlined"
      />
         <Chip
        label="44"
        onClick={handleClick}
        className={classes.chipBig }
        variant="outlined"
      />
         <Chip
        label="45"
        onClick={handleClick}
        className={classes.chipBig}
        variant="outlined"
      />
    </div>
  );
}

OutlinedChips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedChips)