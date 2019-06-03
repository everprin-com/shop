import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';


let styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
});

class CustomizedTooltips extends React.PureComponent {
  state = {
    open: false,
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, Filter, title } = this.props;

    return (
      <ClickAwayListener onClickAway={this.handleTooltipClose}>
        <div onClick={this.handleTooltipOpen}>
          <Tooltip
            PopperProps={{disablePortal: true,}}
            onClose={this.handleTooltipClose}
            open={this.state.open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={<Filter />}
            placement="right"
            classes={{ tooltip: classes.lightTooltip }}>
            <Button
              className={classes.button}>
              {title}
            </Button>
          </Tooltip>
        </div>
      </ClickAwayListener>
    );
  }
}

CustomizedTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTooltips);
