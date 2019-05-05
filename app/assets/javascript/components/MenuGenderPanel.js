import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  menuGenderPanle: {
      display: 'flex',
      justifyContent: 'space-around'
  },
  maleButton: {
      fontSize: '16px',
      width: '49%',
      background: '#2196f3',
  },
  femaleButton: {
    width: '49%',
    fontSize: '16px',
    background: '#rgb(225, 0, 80)',
}
});

function IconLabelButtons(props) {
  const { classes } = props;
  return (
    <div className={classes.menuGenderPanle}>
      <Button variant="contained" color="secondary" className={classes.femaleButton}>
        Женщинам
      </Button>
      <Button variant="contained" color="primary" className={classes.maleButton}>
        Мужчинам
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelButtons);